const body = document.querySelector("body")
const head = document.querySelector("head")

body.innerHTML += `
<header>
    <nav>
        <ul class="navlinks">
            <li><a class="navlink" href="/movies">Movies</a></li>
            <li><a class="navlink" href="/actors">Actors</a></li>
            <li><a class="navlink" href="/movies/new">New Movie</a></li>
            <li><a class="navlink" href="/actors/new">New Actor</a></li>
        </ul>
        <ul class="navlinks">
            <li id="userPlace" class="navlink"></li>
            <li class="navlink" onclick="logout()">Logout</li>
        </ul>
    </nav>
</header>
`

head.innerHTML += `
<link rel="stylesheet" href="/layout/navbar.css">
`

async function logout() {
	console.log("DONE")
	const res = await fetch("/api/auth/logout")
	window.location.reload()
}

async function getUser() {
	const res = await fetch("/api/auth")
	const { user } = await res.json()

	const userPlace = document.getElementById("userPlace")
	userPlace.innerText = user.username
}
getUser()
