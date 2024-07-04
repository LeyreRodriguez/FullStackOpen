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


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }