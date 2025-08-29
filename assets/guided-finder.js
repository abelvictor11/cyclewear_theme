(function(){
  function initGuidedFinder(root){
    if(!root) return;

    const baseUrl = root.dataset.searchBaseUrl || '/search';
    const redirectTo = root.dataset.searchBaseUrl?.includes('/collections/') ? 'collection' : 'search';
    const baseType = root.dataset.baseType || 'product';
    const defaultSort = root.dataset.defaultSort || '';
    const initialStep = root.dataset.initialStep || '';

    const steps = Array.from(root.querySelectorAll('.gf-step'));
    const stepIndexByHandle = Object.fromEntries(steps.map((s, i) => [s.dataset.step, i]));

    const state = {
      qParts: [],
      params: {}, // key -> Set(values)
      history: [], // step handles
      currentStep: initialStep || (steps[0]?.dataset.step || ''),
      selections: {} // stepHandle -> { pName, pVal, qFrag }
    };

    function showStep(handle){
      steps.forEach(sec => sec.hidden = sec.dataset.step !== handle);
      state.currentStep = handle;
      if (state.history[state.history.length - 1] !== handle) state.history.push(handle);
    }

    function addParam(name, value){
      if(!name || !value) return;
      if(!state.params[name]) state.params[name] = new Set();
      state.params[name].add(value);
    }

    function removeParam(name, value){
      if(!name || !state.params[name]) return;
      if(value == null){
        delete state.params[name];
        return;
      }
      state.params[name].delete(value);
      if(state.params[name].size === 0) delete state.params[name];
    }

    function addQ(fragment){
      if(fragment && !state.qParts.includes(fragment)) state.qParts.push(fragment);
    }

    function removeQ(fragment){
      if(!fragment) return;
      const idx = state.qParts.indexOf(fragment);
      if(idx > -1) state.qParts.splice(idx, 1);
    }

    function commitSelection(stepHandle, pName, pVal, qFrag){
      // remove previous contributions from this step
      const prev = state.selections[stepHandle];
      if(prev){
        if(prev.pName && prev.pVal) removeParam(prev.pName, prev.pVal);
        if(prev.qFrag) removeQ(prev.qFrag);
      }

      // add new contributions (if any)
      if(pName && pVal) addParam(pName, pVal);
      if(qFrag) addQ(qFrag);

      // store or clear selection record
      if(pName || pVal || qFrag){
        state.selections[stepHandle] = { pName: pName || '', pVal: pVal || '', qFrag: qFrag || '' };
      } else {
        delete state.selections[stepHandle];
      }
    }

    function buildQuery(){
      const pairs = [];

      // search vs collection params
      if (redirectTo === 'search') {
        const q = state.qParts.join(' ').trim();
        if (q) pairs.push(['q', q]);
        if (baseType) pairs.push(['type', baseType]);
        // Shopify search prefix handling (matches theme forms)
        pairs.push(['options[prefix]', 'last']);
      }

      if (defaultSort) pairs.push(['sort_by', defaultSort]);

      Object.keys(state.params).forEach(key => {
        state.params[key].forEach(val => pairs.push([key, val]));
      });

      const usp = new URLSearchParams();
      pairs.forEach(([k,v]) => usp.append(k, v));
      return usp.toString();
    }

    function finish(){
      const qs = buildQuery();
      const sep = baseUrl.includes('?') ? '&' : '?';
      window.location.href = qs ? baseUrl + sep + qs : baseUrl;
    }

    function goBack(){
      // pop current
      state.history.pop();
      const prev = state.history[state.history.length - 1];
      if(prev){
        showStep(prev);
      } else {
        // go to first step
        showStep(steps[0]?.dataset.step || '');
      }
    }

    // Bind options
    root.querySelectorAll('.gf-option__btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const stepEl = btn.closest('.gf-step');
        const stepHandle = stepEl?.dataset.step || '';
        const pName = btn.dataset.paramName?.trim();
        const pVal = btn.dataset.paramValue?.trim();
        const qFrag = btn.dataset.qFragment?.trim();
        const next = btn.dataset.nextStep?.trim();

        commitSelection(stepHandle, pName, pVal, qFrag);

        if (next) {
          showStep(next);
        } else {
          finish();
        }
      });
    });

    // Bind navigation
    root.querySelectorAll('.gf-back').forEach(b => b.addEventListener('click', goBack));
    root.querySelectorAll('.gf-reset').forEach(r => r.addEventListener('click', () => {
      state.qParts = [];
      state.params = {};
      state.history = [];
      state.selections = {};
      showStep(steps[0]?.dataset.step || '');
    }));

    // Initialize
    if (state.currentStep) showStep(state.currentStep); else if (steps[0]) showStep(steps[0].dataset.step);
  }

  function ready(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn();
  }

  ready(() => {
    document.querySelectorAll('.guided-finder').forEach(initGuidedFinder);
  });
})();
