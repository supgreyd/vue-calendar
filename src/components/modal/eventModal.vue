<template>
    <b-modal id="modal-center" centered
             :ref="'modalCenter'"
             :title="eventToEdit ? 'Edit event' : 'Add event'"
             @shown="editModal()"
             @hide="$emit('hide'), eventToEdit ? clearModal() : null"
             @ok="handleOk">
        <form @submit.stop.prevent="addEvent">
            <label for="eventTitle">Enter event title:</label>
            <b-form-input id="eventTitle" :state="nameState(event.title)" v-model="event.title" type="text"></b-form-input>
            <label for="eventStart">Enter event start date:</label>
            <date-picker v-model="event.start" :config="datePickerOptions" id="eventStart"></date-picker>
            <label for="eventEnd">Enter event end date:</label>
            <date-picker v-model="event.end" :config="datePickerOptions" id="eventStart"></date-picker>
            <label for="eventType">Enter event type:</label>
            <b-form-input id="eventType" :state="nameState(event.type)" v-model="event.type" type="text"></b-form-input>
            <label for="textColor">Enter text color:</label>
            <b-form-input id="textColor" :state="nameState(event.textColor)" v-model="event.textColor" type="color"></b-form-input>
            <label for="bgColor">Enter background color:</label>
            <b-form-input id="bgColor" :state="nameState(event.backgroundColor)" v-model="event.backgroundColor" type="color"></b-form-input>
        </form>
    </b-modal>
</template>

<script>

    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        name: "addEventModal",
        data: () => ({
            date: '',
            event: {
                title: null,
                start: null,
                end: null,
                type: null,
                textColor: '#ffffff',
                backgroundColor: '#007bff'
            },
            datePickerOptions: {
                showClear: true,
                showClose: true,
            }
        }),
        props: [
            'eventToEdit'
        ],
        methods: {
            handleOk (evt) {
                evt.preventDefault()
                if (!this.checkEvent()) {
                    return
                }
                else {
                    this.addEvent()
                }
            },
            addEvent() {
                this.eventToEdit ? this.$emit('editEvent', this.event) : this.$emit('addNewEvent', this.event)
                this.clearModal()
                this.$refs.modalCenter.hide()
            },
            nameState (val) {
                return val && val.length > 0 ? true : false
            },
            checkEvent() {
                let arr = Object.keys(this.event)
                let canAddEvent = true
                for (let i = 0; i < arr.length; i++) {
                    !this.event[arr[i]] ? canAddEvent = false : null
                }
                return canAddEvent
            },
            clearModal () {
                let arr = Object.keys(this.event)
                for (let i = 0; i < arr.length; i++) {
                    this.event[arr[i]] === this.event.textColor ? this.event[arr[i]] = '#ffffff'
                        : this.event[arr[i]] === this.event.backgroundColor ? this.event[arr[i]] = '#007bff'
                        : this.event[arr[i]] = null
                }
            },
            editModal () {
                if (this.eventToEdit) {
                    this.$set(this.event, 'title', this.eventToEdit.title || null)
                    this.$set(this.event, 'start', this.eventToEdit.start._d || this.eventToEdit.start || null)
                    this.$set(this.event, 'end', this.eventToEdit.end._d || this.eventToEdit.end || null)
                    this.$set(this.event, 'type', this.eventToEdit.type || null)
                    this.$set(this.event, 'textColor', this.eventToEdit.textColor || null)
                    this.$set(this.event, 'backgroundColor', this.eventToEdit.backgroundColor || null)
                }
            }
        },
        mounted() {
            // this.editModal()
        }
    }
</script>

<style scoped>

</style>
