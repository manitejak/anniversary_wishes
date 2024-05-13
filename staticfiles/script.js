document.addEventListener('DOMContentLoaded', function() {
    // Dummy data for demonstration
    const quotes = ["Quote 1", "Quote 2", "Quote 3"];
    // const images = ["https://ihplb.b-cdn.net/wp-content/uploads/2021/11/Marseilles.jpg",
    //     "https://ihplb.b-cdn.net/wp-content/uploads/2021/11/Bordeaux.jpg",
    //     "https://ihplb.b-cdn.net/wp-content/uploads/2021/11/eifel-tower-736x430.jpg"
    // ];

    // window.onload = function() {
    //     animateSVGs();
    // };
    
    // function animateSVGs() {
    //     var svgs = document.querySelectorAll('.svg-container svg');
    //     svgs.forEach(function(svg, index) {
    //         setTimeout(function() {
    //             animateSVG(svg);
    //         }, index * 5); // Adjust the delay time (5000 milliseconds = 5 seconds)
    //     });
    // }
    
    // function animateSVG(svg) {
    //     // Your animation code here
    //     // For example, adding a class to trigger CSS animations
    //     svg.classList.add('animate');
    // }

    window.addEventListener('resize', function(){
        location.reload();
    });

    // // Reload the page when cursor changes or a specific element is clicked
    // document.addEventListener("mousemove", function(){
    //     window.location.reload();
    // });

    // document.getElementById("submitBtn").addEventListener("click", function(){
    //     window.location.reload();
    // });


    // Display random quote
    const quoteContainer = document.getElementById('quote');
    quoteContainer.innerHTML = quotes[Math.floor(Math.random() * quotes.length)];

    // Display random image
    // const imageContainer = document.getElementById('image');

    // Generate a random index to select a random image from the array
    // const randomIndex = Math.floor(Math.random() * images.length);

    // Get the URL of the random image
    // const randomImage = images[randomIndex];

    // Calculate the size of the image dynamically based on the page size
    // const imageWidth = window.innerWidth / 3; // Adjust this factor as needed
    // const imageHeight = window.innerHeight / 3; // Adjust this factor as needed

    // Set the HTML content of the image container to display the random image with dynamic size
    // imageContainer.innerHTML = `<div class="image-wrapper">
    // <img src="${randomImage}" alt="Image" style="width: ${imageWidth}px; height: ${imageHeight}px;">
    // </div>
    // `;


    // Fetch comments from Django backend
    fetch('/wish_list/')
    .then(response => response.json())
    .then(comments => {
    // Render comments dynamically
    const commentContainer = document.getElementById('comment-container');
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('com');
        commentDiv.innerHTML = `
        <div class="comment-header">
            <label>Name: </label>
            <span class="author">${comment.title}</span><br>
            <label>Message: </label>
            <span class="contents">${comment.content}</span><br>
            <label>Time: </label>
            <span class="timestamp">${comment.date_posted}</span>
        </div>
        `;
        commentContainer.appendChild(commentDiv);
    });
    })
    .catch(error => console.error('Error fetching comments:', error));



    // Handle chat submission
    document.addEventListener('DOMContentLoaded', function() {
        const chatForm = document.getElementById('chat-form');
        const chatbox = document.getElementById('chatbox');

        // Display comments
        function displayComments(comments) {
            chatbox.innerHTML = '';
            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <h3>${comment.title}</h3>
                    <p>${comment.content}</p>
                `;
                chatbox.appendChild(commentDiv);
            });
        }

        // Fetch comments from the server initially
        fetchComments();

        // Function to fetch comments from the server
        function fetchComments() {
            fetch('/api/comments/')
                .then(response => response.json())
                .then(data => {
                    displayComments(data);
                })
                .catch(error => {
                    console.error('Error fetching comments:', error);
                });
        }

        // Handle chat submission
        chatForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const titleInput = document.getElementById('title');
            const contentInput = document.getElementById('content');
            const title = titleInput.value;
            const content = contentInput.value;
            if (title.trim() !== '' && content.trim() !== '') {
                const newComment = {
                    title,
                    content
                };
                // Send comment data to backend
                console.log(newComment);
                fetch('/wish/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': getCookie('csrftoken') // Get CSRF token
                        },
                        body: JSON.stringify(newComment)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        fetchComments(); // Fetch comments again after adding new comment
                        console.log('Comment added successfully:', data);
                    })
                    .catch(error => {
                        console.error('Error adding comment:', error);
                    });
                titleInput.value = '';
                contentInput.value = '';
            }
        });

        // Function to get CSRF token from cookies
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    });

});