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
			<slot name="calendar-header"/>
		</div>
		<div class="calendar-body">
			<slot name="calendar-body"/>
		</div>
	</div>	
</template>