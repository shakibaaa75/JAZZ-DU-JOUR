import {defineField, defineType} from 'sanity'
export default defineType({name:'bookingSettings', title:'Booking Settings', type:'document', fields:[
  defineField({name:'email', title:'Email', type:'string', validation:r=>r.required()}), defineField({name:'phone', title:'Phone', type:'string', validation:r=>r.required()}),
  defineField({name:'intro', title:'Form Title', type:'string'}), defineField({name:'bandOptions', title:'Band Options', type:'array', of:[{type:'string'}]})
]})
