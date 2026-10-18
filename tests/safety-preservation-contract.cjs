'use strict';
const SAFETY_IDS = Object.freeze(['cachoeira-do-gato','cachoeira-da-friagem','cachoeira-dos-tres-tombos']);
const facts = Object.freeze(['specs.difficulty','specs.distance','specs.duration','specs.access']);
const trans = Object.freeze(['subtitle','description','highlights','specs.distance','specs.duration','specs.access']);
function get(o,p) { return p.split('.').reduce((a,k)=>a==null?undefined:a[k],o); }
function set(o,p,v) { const steps=p.split('.'); let a=o;for(const k of steps.slice(0,-1))a=a[k];a[steps.at(-1)]=structuredClone(v); }
function maskSafetyChanges(actual,approved) {
 const result=structuredClone(actual);
 for(const id of SAFETY_IDS){
   const target=result.touristSpots.find(s=>s.id===id), prior=approved.touristSpots.find(s=>s.id===id);
   if(!target||!prior)throw Error('Missing safety record '+id);
   for(const field of facts)set(target,field,get(prior,field));
   for(const lang of ['pt','en','es','fr','he']) for(const field of trans)set(target.translations[lang],field,get(prior.translations[lang],field));
 }
 return result;
}
function maskFacts(actual,baseline) {
 const output=structuredClone(actual);
 for(const id of SAFETY_IDS){const current=output.find(s=>s.id===id),prior=baseline.find(s=>s.id===id);if(!current||!prior)throw Error('Missing safety fact '+id);for(const field of facts)set(current,field,get(prior,field));}
 return output;
}
function maskTranslation(actual,expected,id,key){
 if(!SAFETY_IDS.includes(id))return actual;
 if(['subtitle','description','highlights'].includes(key))return expected;
 if(key==='specs'){const copy=structuredClone(actual);for(const field of ['distance','duration','access'])copy[field]=structuredClone(expected[field]);return copy;}
 return actual;
}
module.exports={SAFETY_IDS,maskSafetyChanges,maskFacts,maskTranslation};
