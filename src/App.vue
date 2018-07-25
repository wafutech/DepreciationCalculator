<template>
  <div id="app">
  <nav class="navbar navbar-expand-md bg-info navbar-dark fixed-top">
  <!-- Brand -->
  <a class="navbar-brand" href="#"><span><img src="./assets/wafutech.png" alt="Wafutech Logo" width="70" height="70" ></span>Wafutech Asset Depreciation Calculator</a>

  <!-- Toggler/collapsibe Button -->
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>

  <!-- Navbar links -->
  <div class="collapse navbar-collapse float-right" id="collapsibleNavbar">
    <ul class="navbar-nav ">
      <li class="nav-item">
        <a class="nav-link" href="#">Save</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Print</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Share</a>
      </li> 
    </ul>
  </div> 
</nav>
  <div class="content-container">
      
      <router-view/>

  </div>
   


<div class="footer">
  <p><a href="kenhitech.com">Powered by Wafutech 2018</a></p>
</div>
    
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding-top:100px;
  padding-left:180px;
  padding-right:180px;
   padding-bottom:50px;
  background-color:grey;
  height:100%;

}
.content-container{
  color:#000;
  width:100;
  border: 1px solid red;
background-color:#fff;
padding:50px;

}
.footer
{
  position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: #17a2b8;
    color: white;
    text-align: center;
    z-index:-1000;
}
menu-title{
  background-color:#3ad2ea;
}
footer a,a:hover,
a:focus{
  color:#fff;
  text-decoration:none;
}









</style>
