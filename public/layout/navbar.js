const body = document.querySelector("body")
const head = document.querySelector("head")
body.innerHTML += `
<header>
    <nav>
        <ul class="navlinks">
            <li>Movies</li>
            <li>Actors</li>
            <li>New Movie</li>
            <li>New Actor</li>
        </ul>
        <ul class="navlinks">
            <li>Your Account</li>
            <li>Logout</li>
        </ul>
    </nav>
</header>
`

head.innerHTML += `
<link rel="stylesheet" href="/layout/navbar.css">
`
