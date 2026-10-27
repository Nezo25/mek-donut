'use server';

import { revalidatePath } from 'next/cache';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { slugify } from '@/utils/slugify';

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

export async function toggleProductStatus(
  productId: string,
  currentStatus: boolean
): Promise<ActionResponse> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase não está configurado no servidor.',
      };
    }

    const newStatus = !currentStatus;

    const { error } = await supabase
      .from('products')
      .update({ disponivel: newStatus })
      .eq('id', productId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/cardapio');
    revalidatePath('/admin/produtos');

    return {
      success: true,
      data: { disponivel: newStatus },
      message: `Produto marcado como ${newStatus ? 'Disponível' : 'Esgotado'}.`,
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao alterar status.' };
  }
}

export async function deleteProduct(productId: string): Promise<ActionResponse> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase não está configurado no servidor.',
      };
    }

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/cardapio');
    revalidatePath('/admin/produtos');

    return { success: true, message: 'Produto excluído com sucesso.' };
  } catch (err: any) {
    return { success: false, error: err.message || 'Erro ao excluir produto.' };
  }
}

export async function createProductAction(formData: FormData): Promise<ActionResponse> {
  try {
    const supabase = createServerSupabaseClient();
    if (!supabase) {
      return {
        success: false,
        error: 'Supabase não está configurado. Verifique as credenciais no .env.local.',
      };
    }

    const nome = String(formData.get('nome') || '').trim();
    if (!nome) {
      return { success: false, error: 'O nome do produto é obrigatório.' };
    }

    let slug = String(formData.get('slug') || '').trim();
    if (!slug) {
      slug = slugify(nome);
    } else {
      slug = slugify(slug);
    }

    const categoria = String(formData.get('categoria') || 'Exclusivos');
    const preco = parseFloat(String(formData.get('preco') || '0').replace(',', '.'));
    if (isNaN(preco) || preco <= 0) {
      return { success: false, error: 'Informe um preço válido maior que zero.' };
    }

    const precoPromoRaw = formData.get('preco_promocional');
    let preco_promocional: number | null = null;
    if (precoPromoRaw && String(precoPromoRaw).trim() !== '') {
      const parsedPromo = parseFloat(String(precoPromoRaw).replace(',', '.'));
      if (!isNaN(parsedPromo) && parsedPromo > 0) {
        preco_promocional = parsedPromo;
      }
    }

    const descricao = String(formData.get('descricao') || '').trim();
    if (!descricao) {
      return { success: false, error: 'A descrição do produto é obrigatória.' };
    }

    const destaque = formData.get('destaque') === 'true' || formData.get('destaque') === 'on';
    const disponivel = formData.get('disponivel') !== 'false';
    const ordem = parseInt(String(formData.get('ordem') || '0'), 10) || 0;

    // Gerenciamento da Imagem: Upload para o bucket 'produtos' ou URL manual
    let imagem_url = String(formData.get('imagem_url') || '').trim();
    const imageFile = formData.get('imagem_arquivo') as File | null;

    if (imageFile && imageFile.size > 0) {
      const fileExt = imageFile.name.split('.').pop()?.toLowerCase() || 'jpg';
      const cleanFileName = `${Date.now()}-${slug}.${fileExt}`;
      const fileBuffer = await imageFile.arrayBuffer();

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('produtos')
        .upload(cleanFileName, fileBuffer, {
          contentType: imageFile.type || 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        return {
          success: false,
          error: `Falha no upload da foto para o bucket: ${uploadError.message}`,
        };
      }

      const { data: publicUrlData } = supabase.storage
        .from('produtos')
        .getPublicUrl(uploadData.path);

      imagem_url = publicUrlData.publicUrl;
    }

    if (!imagem_url) {
      return {
        success: false,
        error: 'Envie um arquivo de imagem ou informe uma URL de imagem válida.',
      };
    }

    const payload = {
      nome,
      slug,
      categoria,
      preco,
      preco_promocional,
      descricao,
      imagem_url,
      disponivel,
      destaque,
      ordem,
    };

    const { data, error: insertError } = await supabase
      .from('products')
      .insert([payload])
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        return {
          success: false,
          error: `Já existe um produto com o slug "${slug}". Altere o nome ou o slug.`,
        };
      }
      return { success: false, error: insertError.message };
    }

    revalidatePath('/cardapio');
    revalidatePath('/admin/produtos');

    return {
      success: true,
      message: 'Produto cadastrado com sucesso no catálogo!',
      data,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Erro inesperado ao cadastrar produto.',
    };
  }
}
