import {defineField, defineType} from 'sanity'
export default defineType({name:'siteSettings', title:'Site Settings', type:'document', fields:[
  defineField({name:'brand', title:'Brand', type:'string'}), defineField({name:'eyebrow', title:'Hero Eyebrow', type:'string'}),
  defineField({name:'heroTitle', title:'Hero Title', type:'string'}), defineField({name:'heroAccent', title:'Hero Accent', type:'string'}),
  defineField({name:'heroSubtitle', title:'Hero Subtitle', type:'string'}), defineField({name:'combosTitle', title:'Combos Title', type:'string'}),
  defineField({name:'combosLead', title:'Combos Lead', type:'text'}), defineField({name:'realJazz', title:'Real Jazz Statement', type:'string'}),
  defineField({name:'samplesTitle', title:'Samples Title', type:'string'}), defineField({name:'samplesLead', title:'Samples Lead', type:'string'}),
  defineField({name:'bookingTitle', title:'Booking Title', type:'string'}), defineField({name:'bookingLead', title:'Booking Lead', type:'text'}),
  defineField({name:'footerText', title:'Footer Text', type:'string'})
]})
