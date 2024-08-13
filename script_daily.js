document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts-container');

    // Fetch all posts from the API
    fetch('http://89.147.110.89:3000/api/posts')
        .then(response => response.json())
        .then(data => {
            // Filter posts by type "daily"
            const dailyPosts = data.filter(post => post.type === 'daily');

            // Sort posts from new to old
            dailyPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Display each post on the page
            dailyPosts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const postDate = new Date(post.date).toLocaleString();
                postElement.innerHTML = `
                    <h2>${post.text}</h2>
                    <p><strong>User:</strong> ${post.user}</p>
                    <p><strong>Date:</strong> ${postDate}</p>
                    <hr>
                `;

                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
});