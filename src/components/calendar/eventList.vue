<template>
    <div>
        <b-table striped hover outlined show-empty
                 :empty-text="'There is no events yet'"
                 :empty-filtered-text="'There are no records matching your request'"
                 :sort-by.sync="sortBy"
                 :sort-desc.sync="sortDesc"
                 :items="parsedEvents"
                 :filter="filter"
                 :fields="fields">
            <template slot="type" slot-scope="data">
                <b-badge :style="{'color' : data.item.textColor, 'backgroundColor' : data.item.backgroundColor}">{{ data.item.type }}</b-badge>
            </template>
            <template slot="edit_event" slot-scope="data">
                <b-button size="sm" class="align-items-center" @click="$emit('editEvent', data.item)">
                    Edit
                </b-button>
            </template>
            <template slot="delete_event" slot-scope="data">
                <b-button size="sm" class="align-items-center" @click="$emit('removeEvent', data.item)">
                    X
                </b-button>
            </template>
        </b-table>

    </div>
</template>

<script>
    export default {
        name: "eventList",
        data: () => ({
            sortBy: 'event_start',
            sortDesc: false,
            fields: [
                { key: 'event_start', sortable: true },
                { key: 'title', sortable: true },
                { key: 'type', sortable: true },
                { key: 'edit_event', sortable: false },
                { key: 'delete_event', sortable: false },
            ]
        }),
        props: [
          'events',
          'filter'
        ],
        computed: {
            parsedEvents () {
                let events = this.events
                events.forEach(event => {
                    let date = new Date(event.start)
                    this.$set(event, 'event_start', `${date.getFullYear()}.${date.getMonth()+1}.${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`)
                })
                return events
            }
        }
    }
</script>

<style scoped>

</style>
