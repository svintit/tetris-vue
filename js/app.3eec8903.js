(function(e){function t(t){for(var r,i,l=t[0],u=t[1],o=t[2],s=0,d=[];s<l.length;s++)i=l[s],Object.prototype.hasOwnProperty.call(c,i)&&c[i]&&d.push(c[i][0]),c[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);v&&v(t);while(d.length)d.shift()();return n.push.apply(n,o||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],r=!0,l=1;l<a.length;l++){var u=a[l];0!==c[u]&&(r=!1)}r&&(n.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},c={app:0},n=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/tetris-vue/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var o=0;o<l.length;o++)t(l[o]);var v=u;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"0c08":function(e,t,a){"use strict";a("16c1")},"14d4":function(e,t,a){"use strict";a("2efd")},"16c1":function(e,t,a){},"2efd":function(e,t,a){},"32ae":function(e,t,a){"use strict";a("a913")},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("7a23");function c(e,t,a,c,n,i){var l=Object(r["n"])("Tetris");return Object(r["i"])(),Object(r["c"])(l)}var n=Object(r["p"])("data-v-0e414277");Object(r["k"])("data-v-0e414277");var i={class:"main"},l=Object(r["g"])("div",{class:"title"},null,-1);Object(r["j"])();var u=n((function(e,t,a,c,n,u){var o=Object(r["n"])("Board");return Object(r["i"])(),Object(r["c"])("div",i,[l,Object(r["g"])(o)])})),o=Object(r["p"])("data-v-4804bd2f");Object(r["k"])("data-v-4804bd2f");var v={class:"container"},s=Object(r["e"])('<div class="stats" data-v-4804bd2f><div class="holdArea" data-v-4804bd2f><div class="title" data-v-4804bd2f>HOLD</div></div><div class="levelArea" data-v-4804bd2f><div class="title" data-v-4804bd2f>LEVEL</div></div></div>',1),d={class:"gridBox"},b=Object(r["e"])('<div class="stats" data-v-4804bd2f><div class="nextArea" data-v-4804bd2f><div class="title" data-v-4804bd2f>NEXT</div></div><div class="scoreArea" data-v-4804bd2f><div class="title" data-v-4804bd2f>SCORE</div></div></div>',1),f={key:0,class:"gameOver"},O=Object(r["f"])(" 💀 Game Over 💀 ");Object(r["j"])();var p=o((function(e,t,a,c,n,i){var l=Object(r["n"])("Cell");return Object(r["i"])(),Object(r["c"])("div",null,[Object(r["g"])("div",v,[s,Object(r["g"])("div",d,[(Object(r["i"])(!0),Object(r["c"])(r["a"],null,Object(r["m"])(c.grid,(function(e,t){return Object(r["i"])(),Object(r["c"])("div",{key:[e,t],class:"row"},[(Object(r["i"])(!0),Object(r["c"])(r["a"],null,Object(r["m"])(e,(function(e,t){return Object(r["i"])(),Object(r["c"])("div",{key:[e,t]},[Object(r["g"])(l,{cell:e},null,8,["cell"])])})),128))])})),128))]),b]),c.gameOver?(Object(r["i"])(),Object(r["c"])("div",f,[O,Object(r["g"])("button",{onClick:t[1]||(t[1]=function(){return c.restart&&c.restart.apply(c,arguments)}),class:"restartButton"}," Restart ")])):Object(r["d"])("",!0)])})),j=a("3835"),h=a("2909"),g=(a("d81d"),a("caad"),a("2532"),a("159b"),a("fb6a"),a("99af"),Object(r["p"])("data-v-3c3423fe")),y=g((function(e,t,a,c,n,i){return Object(r["i"])(),Object(r["c"])("div",{class:{cell:!0,emptyCell:"empty"===a.cell,straightShapeCell:"straightShape"===a.cell}},null,2)})),m={name:"Cell",props:{cell:String},setup:function(){return{}}};a("32ae");m.render=y,m.__scopeId="data-v-3c3423fe";var w=m,S={name:"Board",components:{Cell:w},setup:function(){var e=20,t=10,a=200,c=0,n=Object(r["l"])(!1),i=Object(r["l"])(0),l=Object(r["l"])(0),u=Object(r["l"])(),o=function(){u.value=Object(h["a"])(Array(e)).map((function(){return Object(h["a"])(Array(t)).map((function(){return"empty"}))}))};o();var v=Object(r["l"])(),s=function(){v.value=[[0,5]]};s(),Object(r["o"])(v,(function(){for(var e=0;e<u.value.length;e++)for(var t=0;t<u.value.length;t++)u.value[e][t].includes("Shape")&&(u.value[e][t]="empty");v.value.forEach((function(e){var t=Object(j["a"])(e,2),a=t[0],r=t[1];u.value[a][r]="tetris"}))}));var d=function(){return["straightShape","straightShape","straightShape","straightShape"]},b=Object(r["l"])([1,0]),f=function(){o(),s(),n.value=!1,l.value=0,O(a)},O=function e(t){setTimeout((function(){u[v.value]=d();var a=Object(j["a"])(v.value[c],2),i=a[0],l=a[1],o=Object(j["a"])(b.value,2),s=o[0],f=o[1],O=[s+i,l+f],p=!1;if(p)n.value=!0;else{var g=Object(r["l"])(v.value.slice(0,v.value.length));v.value=[O].concat(Object(h["a"])(g.value)),e(t-(v.value.length+1))}}),t)};return Object(r["h"])((function(){O(a)})),window.addEventListener("keydown",(function(e){switch(e.key){case"ArrowDown":b.value=[1,0];break;case"ArrowLeft":b.value=[0,-1];break;case"ArrowRight":b.value=[0,1];break;case"ArrowUp":b.value=[-1,0];break}})),{grid:u,restart:f,gameOver:n,highScore:i,currentScore:l}}};a("7004");S.render=p,S.__scopeId="data-v-4804bd2f";var k=S,_={name:"Tetris",components:{Board:k}};a("14d4");_.render=u,_.__scopeId="data-v-0e414277";var A=_,x={name:"App",components:{Tetris:A}};a("0c08");x.render=c;var C=x;Object(r["b"])(C).mount("#app")},"595c":function(e,t,a){},7004:function(e,t,a){"use strict";a("595c")},a913:function(e,t,a){}});
//# sourceMappingURL=app.3eec8903.js.map