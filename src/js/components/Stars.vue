<template>
  <span 
    class="stars" 
    data-stars="5">
    <span
      v-for="num in 5"
      class="star-wrapper">
      <svg 
        height="25" 
        width="23" 
        class="star" 
        data-rating="1">
        <polygon 
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          style="fill-rule:nonzero;"/>
      </svg> 
      <svg 
        height="25" 
        width="23" 
        class="star on" 
        data-rating="1">
        <polygon 
          points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78"
          style="fill-rule:nonzero;"/>
      </svg>      
    </span>
  </span>
</template>