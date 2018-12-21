<template>
    <div class="calendarWrap">
        <b-btn class="mr-2 my-2" v-b-modal.modal-center>Add event</b-btn>
        <b-button class="mr-2 my-2" @click="toggleEventList()">{{ showEventList ? 'Close event list' : 'Event list' }}</b-button>
        <event-filter v-if="showEventList" @filterSearch="startFilter($event)"></event-filter>
        <event-modal :eventToEdit='eventToEdit'
                     :ref="'eventModal'"
                     @hide="eventToEdit = null"
                     @editEvent="updateEvent($event)"
                     @addNewEvent="addNewEvent($event)"></event-modal>
        <event-list v-if="showEventList"
                    :filter="filter"
                    :events="events"
                    @editEvent="editEvent($event)"
                    @removeEvent="removeEvent($event)">
        </event-list>
        <full-calendar v-show="!showEventList"
                       :events="events"
                       :config="config"
                       @event-drop="updateEvent($event)"
                       @event-selected="editEvent($event)"
                       @event-resize="updateEvent($event)"
        ></full-calendar>
    </div>
</template>

<script>

    import { FullCalendar } from 'vue-full-calendar'
    import 'fullcalendar/dist/fullcalendar.css'

    import eventModal from '../modal/eventModal'
    import eventList from './eventList'
    import eventFilter from './eventFilter'

    const STORAGE_KEY = 'event-storage'

    export default {
        name: "calendar",

        data: () => ({
            showEventList: false,
            events: [],
            config: {
                header: {
                    right:  'month, agendaWeek, agendaDay, today',
                    center: 'title',
                    left: 'prev, next'
                },
                height: 'auto',
                defaultView: 'month',
                themeSystem: 'bootstrap4'
            },
            filter: null,
            eventToEdit: null
        }),

        methods: {
            addNewEvent(evt) {
                this.events.push({
                    title: evt.title,
                    start: new Date(evt.start),
                    end: new Date(evt.end),
                    textColor: evt.textColor,
                    backgroundColor: evt.backgroundColor,
                    type: evt.type,
                    id: `_${Math.random().toString(36).substr(2, 9)}`
                })
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
            },
            removeEvent (evt) {
                this.events.forEach((event, key) => {
                    event === evt ? this.events.splice(key, 1) : null
                })
                localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
            },
            toggleEventList () {
                this.showEventList = !this.showEventList
            },
            startFilter(evt) {
                this.filter = evt
            },
            editEvent (evt) {
                this.eventToEdit = evt
                this.$refs.eventModal.$refs.modalCenter.show()
            },
            updateEvent (evt) {
                this.events.forEach(event => {
                    if (event.id === evt.id || this.eventToEdit && event.id === this.eventToEdit.id) {
                        event.title= evt.title,
                        event.start= evt.start,
                        event.end= evt.end,
                        event.textColor= evt.textColor,
                        event.backgroundColor= evt.backgroundColor,
                        event.type= evt.type
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.events))
                    }
                })
            }
        },
        components: {
            FullCalendar,
            eventModal,
            eventList,
            eventFilter
        },
        created() {
            this.events = JSON.parse(localStorage.getItem(STORAGE_KEY))
            !this.events ? this.events = [] : null
        }
    }
</script>

<style lang="scss">
    .calendarWrap{
        width: 100%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
