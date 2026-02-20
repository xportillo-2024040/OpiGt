import {
  fetchPosts,
  fetchPostById,
  createPostRecord,
  updatePostRecord,
  deletePostRecord,
} from './post.service.js';

// Crear publicación
export const createPost = async (req, res) => {
  try {
    const post = await createPostRecord({
      postData: req.body,
      authorId: req.user.id, // Obtenido del JWT
    });

    res.status(201).json({
      success: true,
      message: 'Publicación creada exitosamente',
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la publicación',
      error: err.message,
    });
  }
};

// Listar publicaciones (con paginación opcional)
export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const { posts, pagination } = await fetchPosts({ page, limit, category });

    res.status(200).json({
      success: true,
      data: posts,
      pagination,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las publicaciones',
      error: err.message,
    });
  }
};

// Obtener publicación por ID
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await fetchPostById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener la publicación',
      error: err.message,
    });
  }
};

// Actualizar publicación (solo autor)
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await updatePostRecord({
      id,
      updateData: req.body,
      authorId: req.user.id, // Validar autor dentro del servicio
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada o no tienes permisos',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Publicación actualizada exitosamente',
      data: post,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar la publicación',
      error: err.message,
    });
  }
};

// Eliminar publicación (solo autor)
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await deletePostRecord({
      id,
      authorId: req.user.id, // Validar autor dentro del servicio
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Publicación no encontrada o no tienes permisos',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Publicación eliminada exitosamente',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la publicación',
      error: err.message,
    });
  }
};