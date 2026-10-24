const Module=require('node:module');
const original=Module._load;
const cache=new WeakMap();
Module._load=function(name,parent,isMain){
  const result=original.apply(this,arguments);
  if(name!=='@playwright/test'||!result.test)return result;
  if(cache.has(result))return cache.get(result);
  const test=result.test.extend({uncaughtPageErrors:[async({page},use)=>{
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await use();
    result.expect(errors,'No uncaught browser errors').toEqual([]);
  },{auto:true}]});
  const wrapped={...result,test};cache.set(result,wrapped);return wrapped;
};
