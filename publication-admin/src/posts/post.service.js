import Post from "./post.model.js";

// Crear publicación
export const createPostRecord = async ({ postData, authorId }) => {
  const data = { ...postData, authorId };
  const post = new Post(data);
  await post.save();
  return post;
};

// Listar publicaciones con paginación y filtros opcionales
export const fetchPosts = async ({ page = 1, limit = 10, category }) => {
  const filter = { isActive: true };
  if (category) filter.category = category;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const posts = await Post.find(filter)
    .limit(limitNumber)
    .skip((pageNumber - 1) * limitNumber)
    .sort({ createdAt: -1 });

  const total = await Post.countDocuments(filter);

  return {
    posts,
    pagination: {
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalRecords: total,
      limit: limitNumber,
    },
  };
};

// Obtener publicación por ID
export const fetchPostById = async (id) => {
  return Post.findById(id).populate("authorId", "username email");
};

// Actualizar publicación (solo autor)
export const updatePostRecord = async ({ id, updateData, authorId }) => {
  const post = await Post.findOne({ _id: id, authorId });
  if (!post) return null;

  Object.assign(post, updateData);
  await post.save();
  return post;
};

// Eliminar publicación (solo autor)
export const deletePostRecord = async ({ id, authorId }) => {
  const post = await Post.findOne({ _id: id, authorId });
  if (!post) return null;

  await post.deleteOne();
  return post;
};