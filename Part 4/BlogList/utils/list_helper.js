const dummy = (blogs) => {
    return 1;
  }


const totalLikes = (blogs) => {
    let likes = 0;

    for ( i = 0; i < blogs.length; i++ ) {
        likes += blogs[i].likes
    }

    return likes
}


const favoriteBlog = (blogs) => {
    let favorite = blogs[0];

    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > favorite.likes) {
            favorite = blogs[i];
        }
    }

    return favorite;
}


const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    const authorBlogCount = {};

    blogs.forEach(blog => {
        if (authorBlogCount[blog.author]) {
            authorBlogCount[blog.author]++;
        } else {
            authorBlogCount[blog.author] = 1;
        }
    });

    let mostBlogsAuthor = null;
    let maxBlogs = 0;

    for (const author in authorBlogCount) {
        if (authorBlogCount[author] > maxBlogs) {
            maxBlogs = authorBlogCount[author];
            mostBlogsAuthor = author;
        }
    }

    return {
        author: mostBlogsAuthor,
        blogs: maxBlogs
    };
}


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }