<template>
	<div>
		<p>Calendar {{id}}</p>
		<p>{{dateFrom}}</p>
		<p>{{dateTo}}</p>
		<div class="calendar-wrapper">
			<div class="calendar-fields">
				<input 
					v-model="dateFrom"
					type="text"
					placeholder="Check in" 
					class="calendar-field field"/>
				<div class="calendar-field-arrow">
					<i class="fas fa-arrow-right"></i>
				</div>
				<input 
					v-model="dateTo"
					type="text"
					placeholder="Check out"
					class="calendar-field field" />
			</div>
			<div class="calendar">
				Calendar
				<div class="calendar-header">
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {makeId} from './../../helpers'
	export default {
		data() {
			return {
				dateFrom: '',
				dateTo: '',
			}
		},
		computed: {
			id() {
				return makeId()
			},
		}
	}
</script>