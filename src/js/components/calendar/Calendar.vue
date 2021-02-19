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
				<div class="calendar-header">
					<button
						type="button"
						class="calendar-btn calendar-btn-chevron float-left">
						<i class="fas fa-chevron-left"></i>
					</button>
					<button
						type="button"
						class="calendar-btn calendar-btn-chevron float-right">
						<i class="fas fa-chevron-right"></i>
					</button>
					<span>
						<a 
							href="#"
							class="calendar-btn">March</a> 
						<a 
							href="#"
							class="calendar-btn">{{year}}</a></span>
				</div>
				<div class="calendar-body">
					<days 
						:month-index="monthIndex"
						:year="year"/>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {makeId} from './../../helpers'
	import moment from 'moment'
	import Days from './Days'

	export default {
		components: {Days},
		data() {
			return {
				form: {
					dateFrom: '',
					dateTo: '',					
				},
				monthIndex: moment().month(),
				year: moment().year(),
			}
		},
		computed: {
			id() {
				return makeId()
			},
		}
	}
</script>