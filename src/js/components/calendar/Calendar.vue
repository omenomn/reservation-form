<template>
	<div>
		<p>Calendar {{id}}</p>
	<!-- 	<pre>{{dates}}</pre>
		<pre>{{modelDates}}</pre> -->
		<div class="calendar-wrapper">
			<div class="calendar-fields">
				<input 
					:value="modelDates[0] || ''"
					type="text"
					placeholder="Check in" 
					class="calendar-field field"
					:readonly="true"/>
				<div class="calendar-field-arrow">
					<i class="fas fa-arrow-right"></i>
				</div>
				<input 
					:value="modelDates[1] || ''"
					type="text"
					placeholder="Check out"
					class="calendar-field field"
					:readonly="true"/>
			</div>
			<days-card 
				v-if="mode == DAYS_MODE"
				:date="date"
				v-on:mode-changed="changeMode($event)"
				v-on:date-changed="changeDate($event, MONTH_TYPE)"
				v-model="dates"/>
			<months-card 
				v-if="mode == MONTHS_MODE"
				:date="date"
				v-on:mode-changed="changeMode($event)"
				v-on:date-changed="changeDate($event, YEAR_TYPE)"/>		
			<years-card 
				v-if="mode == YEARS_MODE"
				:date="date"
				:period="yearsPeriod"
				v-on:mode-changed="changeMode($event)"
				v-on:date-changed="cardKey++"/>			
		</div>
	</div>
</template>
<script>
	import {makeId} from './../../helpers'
	import moment from 'moment'
	import DaysCard from './cards/Days'
	import MonthsCard from './cards/Months'
	import YearsCard from './cards/Years'

	export const DAYS_MODE = 'days'
	export const MONTHS_MODE = 'months'
	export const YEARS_MODE = 'years'

	export const YEAR_TYPE = 'year'
	export const MONTH_TYPE = 'month'
	export const DAY_TYPE = 'day'

	export default {
		components: {DaysCard, MonthsCard, YearsCard},
		data() {
			return {
				dates: [],	
				date: moment(),
				mode: DAYS_MODE,
			}
		},
		computed: {
			id() {
				return makeId()
			},
			DAYS_MODE: () => DAYS_MODE,
			MONTHS_MODE: () => MONTHS_MODE,
			YEARS_MODE: () => YEARS_MODE,
			MONTH_TYPE: () => MONTH_TYPE,
			DAY_TYPE: () => DAY_TYPE,
			YEAR_TYPE: () => YEAR_TYPE,
			yearsPeriod: () => 9,
			modelDates() {
				return this.dates.map((date) => date.format())
			}
		},
		methods: {
			changeDate(
				medhod, 
				type = MONTH_TYPE, 
				period = 1
			) {
				this.date = this.date.[medhod](period, type).clone()
			},
			changeMode(mode) {
				if (this.mode != mode) {
					this.mode = mode
				} else if (mode == MONTHS_MODE) {
					this.mode = DAYS_MODE
				} else if (mode == YEARS_MODE) {
					this.mode = MONTHS_MODE
				}
			}
		}
	}
</script>