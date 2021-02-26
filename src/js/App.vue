<template>
  <div>
  	<h1>Hello world!</h1>
  	<calendar
  		:ranges="[
  			['2021-01-09', '2021-01-11'],
  			['2021-01-08', '2021-01-15'],
  			['2021-02-08', '2021-02-15'],
  		]"/>
  </div>
</template>
<script>	
	import Calendar from './components/calendar/Calendar'

	export default {
		components: {Calendar}
	}
</script>