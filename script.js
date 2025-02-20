const feed = document.getElementById("feed");
const loading = document.getElementById("loading");
let page = 1;
let loadingData = false;
const accessKey = "rxWZfk2G6WiLLaBjUVCO1D9t1o58z5BuWb37aapy2Ag";

async function fetchData(page) {
  const response = await fetch(
    `https://api.unsplash.com/photos?page=${page}&per_page=10&client_id=${accessKey}`
  );
  const data = await response.json();
  console.log("Data fetched from Unsplash API:", data);
  return data.map((photo) => ({
    id: photo.id,
    title: photo.alt_description || "Untitled",
    imageUrl: photo.urls.regular,
    photographer: photo.user.name,
    photoLink: photo.links.html,
    downloadLink: photo.urls.full,
    likes: photo.likes,
  }));
}


function renderPosts(posts) {
  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    postElement.innerHTML = `
        <img src="${post.imageUrl}" alt="Post Image">
        <div class="post-content">
            <h2>${post.title}</h2>
            <p><strong>Photographer:</strong> ${post.photographer}</p>
            <div class="button-container">
    <a href="${post.photoLink}" target="_blank" class="download-btn">
        <!-- SVG for Visit button -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
        </svg>
    </a>
    <a href="${post.downloadLink}" download="${post.title}.jpg" class="download-btn">
        <!-- SVG for Download button -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M3 19H21V21H3V19ZM13 13.1716L19.0711 7.1005L20.4853 8.51472L12 17L3.51472 8.51472L4.92893 7.1005L11 13.1716V2H13V13.1716Z"></path>
        </svg>
    </a>
    <p class="like-btn">
        ${post.likes}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path></svg>
    </p>
</div>

        </div>
      `;

    feed.appendChild(postElement);
  });
}


window.addEventListener("scroll", async () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 50 &&
    !loadingData
  ) {
    loadingData = true;
    loading.style.display = "block";
    page++;
    const posts = await fetchData(page);
    renderPosts(posts);
    loading.style.display = "none";
    loadingData = false;
  }
});

async function init() {
  const posts = await fetchData(page);
  renderPosts(posts);
}

init();
