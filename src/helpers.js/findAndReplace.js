export const findPostAndReplace = (posts, newPost) => {
    const newArr = posts.map(post => {
        if(post._id === newPost._id) {
            return newPost;
        } else {
            return post;
        }
    })

    return newArr;
} 