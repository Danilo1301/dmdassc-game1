const includes = ["CGame", "CCamera", "CLoader", "CAssets", "CPlayer", "CGrid", "CGameLoop", "CInput", "CScreen", "CLoadBar", "CGui", "CButton", "CNetwork", "CMap", "CTile"];

var ps = [];
for (var include of includes) { ps.push(new Promise(function(resolve, reject) { $.getScript("/js/class/"+include+".js", ()=>{ resolve() })}))};

Promise.all(ps).then(function(values) {
  CGame.Initializate();
});


Math.lerp = function(value1, value2, amount) {
  amount = amount < 0 ? 0 : amount;
  amount = amount > 1 ? 1 : amount;
  return value1 + (value2 - value1) * amount;
}

Math.clamp = function (value, min, max) {
  if (value < min) { return min; }
  else if (value > max) { return max; }
  return value;
}
