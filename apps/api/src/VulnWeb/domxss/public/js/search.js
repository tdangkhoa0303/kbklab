let posts;
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/posts", true);
xhr.onload = (e) => {
	const params = new URLSearchParams(window.location.search);
	let search = "";
	if (params.has("content")) {
		search = params.get("content");
	}
	document.getElementById("container").remove();
	const body = JSON.parse(xhr.response);
	var container = document.createElement("div");
	container.classList.add("container");
	container.setAttribute("id", "container");
	document.body.appendChild(container);
	posts = body.posts;
	let searchPosts = [];

	posts.forEach((post) => {
		if (post.content.indexOf(search) >= 0) {
			searchPosts.push(post);
		}
	});
	console.log(searchPosts);
	for (let index = 0; index < searchPosts.length; index++) {
		const post = searchPosts[index];
		var row = document.createElement("div");
		row.classList.add("row");
		container.appendChild(row);
		var col = document.createElement("div");
		col.classList.add("col-md-8");
		row.appendChild(col);
		var postsContent = document.createElement("div");
		postsContent.classList.add("posts-content");
		col.appendChild(postsContent);

		let commentContent = "";
		for (let j = 0; j < post.comments.length; j++) {
			const comment = post.comments[j];
			commentContent =
				commentContent +
				`<div class="post-comment">
			<p>` +
				comment.author +
				`
			<span>` +
				comment.content +
				`</span></p>
		  </div>`;
		}

		postsContent.innerHTML =
			`<div class="post-container">
			<div class="post-detail">
			  <div class="user-info">
				<h5><p class="profile-author">` +
			post.author +
			`</p></h5>
			  </div>
			  <div class="line-divider"></div>
			  <div class="post-content">
				` +
			post.content +
			`<i class="em em-anguished"></i> <i class="em em-anguished"></i> <i class="em em-anguished"></i></p>
			  </div>
			</div>
			<div class="line-divider"></div>` +
			commentContent +
			`<form class="post-comment" method="post" action="/posts/` +
			post.id +
			`/comments">
			<input type="text" class="form-control" name="content" placeholder="Post a comment">
		  </form></div>`;
	}
};
xhr.send(null);

const onSearchClick = () => {
	const value = document.getElementById("search-box").value;
	let href = window.location.href + "?content=" + value;
	href = href.substring(0, href.indexOf("?"));
	href = href + "?content=" + value;
	window.location.href = href;
};
