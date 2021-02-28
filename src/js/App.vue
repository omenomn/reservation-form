<template>
  <div>
    <div class="card reserve-card">
      <h3>300 zł</h3>
      <p class="d-inline">
        <stars/>
        123
      </p>
      <div class="divider"></div>
      <form @submit.prevent="send(form)">
        <label>Dates</label>
        <calendar
          v-model="form.dates"
          format="DD-MM-YYYY"
          :ranges="[
            ['2021-01-09', '2021-01-11'],
            ['2021-01-08', '2021-01-15'],
            ['2021-02-08', '2021-02-15'],
          ]"
          :overlap="form.overlap"/>
        <label for="overlap">
          <input 
            type="checkbox" 
            id="overlap"
            v-model="form.overlap">
            Zaznaczenie pola, umożliwia zaznaczenie zakresu dat nakładającego sie na zajety (czerwony) zakres
        </label>
        <br>
        <button class="btn">Wyślij</button>
      </form>
    </div>
  </div>
</template>
<script>	
	import Calendar from './components/calendar/Calendar'
  import Stars from './components/Stars'

	export default {
		components: {Calendar, Stars},
    data() {
      return {
        form: {
          dates: [],
          overlap: false
        }
      }
    },
    methods: {
      send(form) {
        console.log(form)
      }
    }
	}
</script>