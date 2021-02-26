<template>
	<div class="calendar">
		<div class="calendar-header">
			<button
				@click="$emit('date-changed', 'subtract')"
				type="button"
				class="calendar-btn calendar-btn-chevron float-left">
				<i class="fas fa-chevron-left"></i>
			</button>
			<button
				@click="$emit('date-changed', 'add')"
				type="button"
				class="calendar-btn calendar-btn-chevron float-right">
				<i class="fas fa-chevron-right"></i>
			</button>				
			<span v-if="!$slots.header">
				<a 
					href="#"
					@click.prevent="$emit('mode-changed', MONTHS_MODE)"
					class="calendar-btn">{{date.format('MMMM')}}</a> 
				<a 
					href="#"
					@click.prevent="$emit('mode-changed', YEARS_MODE)"
					class="calendar-btn">{{date.year()}}</a>
			</span>
			<slot v-else name="header"/>
		</div>
		<div class="calendar-body">
			<slot/>
		</div>
	</div>	
</template>
<script>
	import {MONTHS_MODE, YEARS_MODE} from './../Calendar'
	export default {
		props: ['date'],
		computed: {		
			MONTHS_MODE: () => MONTHS_MODE,
			YEARS_MODE: () => YEARS_MODE,
		}
	}
</script>