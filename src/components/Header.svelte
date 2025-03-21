<script>
  /** @type {{logoSrc?: string}} */
  let { logoSrc = '/logo.png' } = $props();
  
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function handleClick() {
    // @ts-ignore
    navigator('/');
  }
</script>
<style>

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to right, #fffeff, #000000);
  width: 100%;
  color: #fff;
  padding: 1rem 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

img {
  position: relative;
  top: 2px;
  width: 50px;
  height: 50px;
  margin-right: 1.1rem;
  margin-left: 5px;
  transition: transform 0.5s ease-in-out;
}

img:hover {
  transform: scale(1.2);
}

.logo-container {
  display: flex;
  align-items: center;
}

.hamburger {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem;
  color: white;
  transition: transform 0.3s ease-in-out;
}

.hamburger:hover {
  transform: scale(1.1);
}

/* Side Menu Styling */
.side-menu {
  position: fixed;
  top: 0;
  right: -250px;
  height: 100%;
  width: 250px;
  background-color: #230f2b;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.2);
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: white;
}

.side-menu.open {
  right: 0;
}

.side-menu a {
  text-decoration: none;
  color: white;
  margin: 1rem 0;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.side-menu a:hover {
  color: #f21d41;
}

/* Media query for smaller screens */
@media (max-width: 768px) {
  header {
    padding: 1rem;
  }

  img {
    position: relative;
    top: 10px;
    margin-right: 1.1rem;
    margin-left: 1rem;
  }
}

</style>

<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">

<header class="flex justify-between items-center bg-gradient-to-r from-red-600 to-gray-800 text-white px-8 py-4 shadow-lg">
  <div class="flex items-center">
    <img
      src={logoSrc}
      alt="MutterCorp Logo"
      class="w-12 h-12 transition-transform duration-500 hover:scale-110 cursor-pointer"
      onclick={handleClick}
    />
  </div>
  <div
    class="flex justify-center items-center text-2xl cursor-pointer transition-transform duration-300 hover:scale-110"
    onclick={toggleMenu}
  >
    <i class="fas fa-bars"></i>
  </div>
</header>

<div
  class={`fixed top-0 right-0 h-full w-64 bg-gray-800 text-white shadow-lg transform ${
    menuOpen ? 'translate-x-0' : 'translate-x-full'
  } transition-transform duration-300 flex flex-col p-6`}
>
  <a href="#home" class="text-lg my-2 hover:text-red-400 transition-colors">
    Home
  </a>
  <a href="#about" class="text-lg my-2 hover:text-red-400 transition-colors">
    About
  </a>
  <a href="#services" class="text-lg my-2 hover:text-red-400 transition-colors">
    Services
  </a>
  <a href="#contact" class="text-lg my-2 hover:text-red-400 transition-colors">
    Contact
  </a>
</div>
