<template>
  <div>
  <h3 class="title">Fixed Asset Depreciation Calculator</h3>

  <!--Depreciation Methods drop-down-->
  <div class="panel panel-default">
    <div class="panel-heading">
    <div v-cloak>
        <div class="row">
          <div class="col-md-6">
          <div class="form-group" :onload="fetchDepreciationMethods()">
            <label>Select Depreciation Method:</label>
            <select v-model="selected_method" :onchange="loadDeprecianMethodForm()" class="form-control" style="height:40px;">
            <option disabled>Select Depreciation Method</option>
            <option v-for="d in dpmethods" v-bind:value="d.depreciation_method">{{d.depreciation_method}}</option> 
          </select> 

          </div>
          </div>
          </div>
        </div>
    </div>
    </div>

  <!--End of Depreciation Methods Drop-down--> 






<!--DEPRECIATION METHODS FORMS-->

<!--STRAIGHT LINE-->
<div v-if="showStraightLineForm">
  <div class="panel panel-success">
  <div class="panel-heading">
  <div class="panel-title">
  <h3>Straight Line Depreciation  Calculator</h3>
  </div>
  </div>
  <div class="panel-body">
  <div class="row">
  <div class="col-md-6">
  <form v-on:submit.prevent="straightLineDepCal">

      <div class="row">
      <div class="col-md-10">
      <div class="form-group">
            <label>Historical Cost:</label>
            <input type="number" class="form-control" v-model="asset.purchase_price" placeholed="This is usually the purchase price of the fixed asset">
            </div>
      </div>
      
      </div>
      <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Salvage Value:</label>
              <input type="number" class="form-control" v-model="asset.salvage_value" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years:</label>
              <input type="number" class="form-control" v-model="asset.useful_years" />
            </div>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-info">Calculate</button>
        </div>
      
</form>
  </div>
  <div class="col-md-6 alert alert-info">
  <h3>Help Info!</h3>
  <p><strong>This method spreads the cost of the fixed asset evenly over its useful life.</strong></p>
  <p>When using the straight-line method, the salvage value reduces the depreciable base. Assume that Penway purchases a toaster fabrication machine for $30,000. Salvage value is $3,000. The cost of the machine ($30,000) minus its salvage value ($3,000) gives you a depreciable base of $27,000.</p>

<p>The expected useful life is 5 years. So depreciation expense for the toaster machine is $27,000 / 5, or $5,400 depreciation expense per year for each of the five years. Book value at the end of year 5 is the salvage value of $3,000.</p>
  </div>
  </div>
     

  </div>
  </div>

</div>
<!--</STRAIGHTLINE>-->




<!-- REDUCING BALANCE-->
  <div v-if="showReducingBalForm">
  
  <div class="panel panel-success">
  <div class="panel-heading">
  <div class="panel-title">
  <h3>Declining Balance Depreciation Calculator</h3>
  </div>
  </div>
  <div class="panel-body">
  <div class="row">
  <div class="col-5">
  <form v-on:submit.prevent="reducingBalDepCal">
  <div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <label>Historical Cost:</label>
            <input type="number" class="form-control" v-model="reducingbal.purchase_price">
          </div>
        </div>
        </div>
        

                   
          <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years:</label>
              <input type="number" class="form-control" v-model="reducingbal.useful_years" />
            </div>
          </div>
        </div>
      <div class="form-group">
          <button class="btn btn-info">Calculate</button>
        </div>
  </form>

  </div>

  <div class="col-md-7 alert alert-info">
 <h3>Help Info!</h3>
  <p><em>An accelerated method of depreciation, it results in higher depreciation expense in the earlier years of ownership</em></p>
  <p>Don’t deduct salvage value when figuring the depreciable base for the declining balance method. But do limit depreciation so that, at the end of the day, the asset’s net book value is the same as its estimated salvage value.</p>

<p>You compute cost and salvage value for the asset the same as with the straight-line method. For your rate, you use a multiple of the straight-line rate.<p>

<p>Going back to the Penway example, the straight-line rate is 20 percent. Well, because the toaster-making machine has a useful life of five years, shown as a percentage, the straight-line rate is 1/5, or 20 percent per year.</p>
    </div>
  </div>
  
  </div>
  </div>
  </div>
<!-- </REDUCINGBAL>-->


<!--UNIT OF PRODUCTION-->
<div v-if="showUnitofProductionForm">

<div class="panel panel-success">
  <div class="panel-heading">
  <div class="panel-title">
  <h3>Units of Production Depreciation Calculator</h3>
  </div>
  </div>
  <div class="panel-body">
  <div class="row">
  <div class="col-md-6">
  <form v-on:submit.prevent="unitProductionDepCal" method="post">

  <div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <label>Historical Cost:</label>
            <input type="number" class="form-control" v-model="asset.purchase_price">
          </div>
        </div>
        </div>

         <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Salvage Value:</label>
              <input type="number" class="form-control" v-model="asset.salvage_value" />
            </div>
          </div>
        </div>
          
          <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years:</label>
              <input type="number" class="form-control" v-model="asset.useful_years" />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Outer Shells Units:</label>
              <input type="number" class="form-control" v-model="asset.life_time_units" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Current Units:</label>
              <input type="number" class="form-control" v-model="asset.current_units" />
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <button class="btn btn-info">Calculate</button>
        </div>
        <div class="alert alert-danger" v-show="isUnitError">{{statusError}}</div>
    </form>
  </div>
  <div class="col-md-6 alert alert-info">
  <h3>Help Info!</h3>
  <p><strong>The total estimated number of units the fixed asset will produce over its expected useful life, as compared to the number of units produced in the current accounting period, is used to calculate depreciation expense.</strong></p>
  <p>Units-of-production is an activity method because you compute depreciation on actual physical use, making it a fantastic method for computing factory machinery depreciation.</p>
  <p>In addition to knowing the cost basis and estimating the salvage value, you need to estimate how many outer shells the machine can produce prior to retirement
  </p>
  </div>
  </div>
  
  </div>

  </div>

</div>
<!-- </UNITOFPRODUCTION>-->



<!-- SUM OF YEARS -->
<div v-if="showSumofYearsForm">

<div class="panel panel-success">
  <div class="panel-heading">
  <div class="panel-title">
  <h3>Sum of the Years Depreciation Calculator</h3>
  </div>
  </div>
  <div class="panel-body">
 <div class="row">
 <div class="col-md-6">
 <form v-on:submit.prevent="sumYearsDepCal">
<div class="row">
        <div class="col-md-10">
          <div class="form-group">
            <label>Historical Cost:</label>
            <input type="number" class="form-control" v-model="asset.purchase_price">
          </div>
        </div>
        </div>
         <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Salvage Value:</label>
              <input type="number" class="form-control" v-model="asset.salvage_value" />
            </div>
          </div>
        </div>
          
          <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years:</label>
              <input type="number" class="form-control" v-model="asset.useful_years" />
            </div>
          </div>
        </div>
      <div class="form-group">
          <button class="btn btn-primary">Calculate</button>
        </div>

</form>
 </div>
 <div class="col-md-6 alert alert-info">
 <h3>Help Info!</h3>
 <p><strong>Compute depreciation expense by adding all years of the fixed asset’s expected useful life and factoring in which year you are currently in, as compared to the total number of years</strong></p>
 <p>With this method, you come up with a depreciation fraction using the number of years of useful life. Penway’s machine has a useful life of five years. Add (5 + 4 + 3 + 2 + 1 = 15) to get your denominator for the rate fraction. In year 1, your multiplier is 5/15 (1/3); in year 2, the multiplier is 4/15; and so on.</p>
 </div>
 </div>
  </div>
  </div>

</div>
<!-- </SUMOFYEARS>--> 






<!--WARNING MESSAGE-->
<div v-if="showWarning">
<div class="alert alert-warning">
<p>Please click in the dropdown above and choose asset 
depreciation method!</p>
</div>
</div> 
<!--CALCULATION RESULTS-->
<div  v-if="showStraightLineResults">
<div v-html="straightLineResult"></div>
</div>
<div v-if="showReducing">

<div v-html="reducingBalResult"></div>

</div>

<div v-if="showSumofYears">

<div v-html="sumYearsResult"></div>

</div>
<div v-if="showunitofProduction">
<div v-html="unitsofProductionResult"></div>
</div>

  </div>
</template>

<script>
  export default {
 
    data(){
        return{
          dpmethods:{},
          selected_method: '',
          showStraightLineForm: false,
          showReducingBalForm: false,
          showUnitofProductionForm:false,
          showSumofYearsForm:false,
          showWarning:false,
          reducingbal:{},
          asset:{},
          showStraightLineResults:false,
          showReducingBalResult:false,
          yearsResult:false,
          showUnitProductionResult:true,
          results:'',
          showReducingBalProjection:false,
          reducingBalProjection:'',
          straightLineResult:'',
          reducingBalResult:'',
          sumYearsResult:'',
          unitsofProductionResult:'' ,
          statusError:'',
          isUnitError:false,
          method_desc:'',
          showReducing:false,
          showunitofProduction:false ,
          showSumofYears:false       


        }

    },

    beforeMount: function()
        {
          this.fetchDepreciationMethods();
          this.straightLineDepCal();
          this.reducingBalDepCal();
          this.sumYearsDepCal();
          this.unitProductionDepCal();
        },

        

    methods: {

      fetchDepreciationMethods()
      {
      var _this = this;
      if(!_this.dpmethods.length)
      {
      var depreciations = {}
       return this.axios.get('lists/asset-depreciations').then((depreciations) => {
        _this.dpmethods = depreciations.data;
      });
      }
        
       
      },

      loadDeprecianMethodForm()
      {
      if(this.selected_method !=undefined)
      {
        if(this.selected_method=='Straight Line')
        {
        this.showStraightLineForm = true;
        this.showUnitofProductionForm = false;          this.showSumofYearsForm = false;
        this.showReducingBalForm = false;
        this.showWarning = false;
        }
        else if(this.selected_method=='Declining Balance')
        {
        this.showReducingBalForm = true;

        this.showStraightLineForm = false;
        this.showUnitofProductionForm =false;
        this.showSumofYearsForm = false;
        this.showWarning = false;
         this.showStraightLineResults =false
          this.showReducingBalResult=false
          this.showSumofyearsResult=false
          this.showUnitProductionResult=false

        }

        else if(this.selected_method=='Sum-of-the-years digits')
        {
        this.showReducingBalForm = false;

        this.showStraightLineForm = false;
        this.showUnitofProductionForm =false;
        this.showSumofYearsForm = true;
        this.showWarning = false;
         this.showStraightLineResults =false
          this.showReducingBalResult=false
          this.showSumofyearsResult=false
          this.showUnitProductionResult=false

        }

        else if(this.selected_method=='Units-of-production')
        {

        this.showReducingBalForm = false;

        this.showStraightLineForm = false;
        this.showUnitofProductionForm =true;
        this.showSumofYearsForm = false;
        this.showWarning = false;
         this.showStraightLineResults =false
          this.showReducingBalResult=false
          this.showSumofyearsResult=false
          this.showUnitProductionResult=false
          
                  }

        else
        {
        this.showReducingBalForm = false;

        this.showStraightLineForm = false;
        this.showUnitofProductionForm =false;
        this.showSumofYearsForm = false;
        this.showWarning = true;
         this.showStraightLineResults =false
          this.showReducingBalResult=false
          this.showSumofyearsResult=false
          this.showUnitProductionResult=false
        }

      }

      },
      straightLineDepCal()
      {
            this.showReducing = false
            this.showunitofProduction = false


      //This methods calculates depreciation using the straight line depreciation formular.
      var resultTable ='<table class="table table-stripped">'+'<thead><tr><th>Year</th><th>Book Value</th><th>Writen Down Value</th></tr>';       
       
       var purchasePrice = this.asset.purchase_price;
      var salvageValue = this.asset.salvage_value;
      var usefulYears =this.asset.useful_years;
      var depreciableCost = purchasePrice-salvageValue;
      var yearlyDepreciation = depreciableCost/usefulYears;
      this.results = yearlyDepreciation;
      var accDpr = 0;

        for(var i=1; i<=usefulYears;i++)
        {
        const dpvalue =yearlyDepreciation
         depreciableCost-=dpvalue
         accDpr+=yearlyDepreciation
        resultTable+='<tr><td>'+'Year '+i +'</td><td>'+this.formatCurrency(depreciableCost)+'</td><td>'+this.formatCurrency(accDpr)+'</td></tr>';
        }
        resultTable+='<tr><th colspan="2">Annual Depreciation</th><th>'+this.formatCurrency(yearlyDepreciation)+'</th></tr>'
         resultTable+='<tr><th colspan="2">Monthly Depreciation</th><th>'+this.formatCurrency(yearlyDepreciation/12)+'</th></tr>'
          resultTable+='<tr><th colspan="2"> Depreciation Period</th><th>'+ usefulYears*12 +' Months</th></tr>'
         resultTable+='</table>'
         this.showStraightLineResults=true
        this.straightLineResult = resultTable

      },

      reducingBalDepCal()
      {
          this.showunitofProduction = false

        var purchasePrice = this.reducingbal.purchase_price;     
        var usefulYears = this.reducingbal.useful_years;
        var rate = 100/usefulYears;
        var doubleDepreciationRate = rate*2;
        var resultTable ='<table class="table table-striped>"';
        resultTable+='<thead><tr><th>Year</th><th>Depreciated Amount</th><th>Book Value</th><th>Acc Depreciation</th></thead></tr>'
          var accDpr = 0;
          var currentDp=purchasePrice
          var DepreciatedValue =purchasePrice
          var bookBal;
        
        for(var i=1;i<=usefulYears; i++)
        {
           DepreciatedValue=(doubleDepreciationRate/100)*currentDp
            currentDp -=(doubleDepreciationRate/100)*currentDp
            bookBal =currentDp
            
          accDpr+=DepreciatedValue


        resultTable+='<tr><td> Year '+i+' </td><td>'+this.formatCurrency(DepreciatedValue)+'</td><td>'+this.formatCurrency(bookBal)+'</td><td>'+this.formatCurrency(accDpr)+'</td></tr>'
        }
        resultTable+='<tr><th colspan="3"> Depreciation Period</th><th>'+usefulYears*12+' Months</th></tr>'
        resultTable+='</table>'
        this.reducingBalResult = resultTable
        this.showunitofProduction = false
        //this.showSumofYears = false
      this.showReducing = true


      },

  sumYearsDepCal()
      {


      //Calculates depreciation based on sum of useful years formula
      //Hide results if any
      var purchasePrice = this.asset.purchase_price;
      var salvageValue = this.asset.salvage_value;
      var usefulYears = this.asset.useful_years;
      var usefulYearsReducing = usefulYears;
      var denominator =0
      for(var i=0;i<usefulYears;i++)
      {
      denominator+=usefulYears-i
      }

      var depreciatableValue = purchasePrice-salvageValue
      console.log(depreciatableValue)
      var counter =0
      var total =0
      var depreciation =0
      var bookvalue = depreciatableValue
      var resultTable ='<table class="table table-striped"><thead><tr><th>Year</th><th>Depreciated Amount</th><th>Book Value</th><th>Acc Depreciation</th></tr></thead>'
      for(var i=0;i<usefulYears;++i)
      {
       counter++
       depreciation = ((usefulYears-i)/denominator)*depreciatableValue
       total+=depreciation
       bookvalue-=depreciation

      resultTable+='<tr><td>Year '+counter+'</td><td>'+ this.formatCurrency(depreciation)+'</td><td>'+this.formatCurrency(bookvalue)+'</td><td>'+this.formatCurrency(total)+'</td></tr>'
      }
      var notes = 'Checking the math, you know you can’t depreciate past salvage value, so adding all'
      notes+=' '+ this.asset.useful_years 
      notes+=' years of depreciation expense equals ' + this.formatCurrency(depreciatableValue)
      notes+=' . which is calculated by substracting salvage value from purchase price being refered to as historical value ('
      notes+= this.formatCurrency(purchasePrice-this.asset.salvage_value)+' = ' + this.formatCurrency(depreciatableValue)
      notes=+' ), therefore this maths is 100 percent correct!'


      resultTable+='<tr><th colspan="3">Monthly Depreciation</th><th>'+this.formatCurrency(depreciatableValue/12)+'</th></tr>'
      resultTable+='<tr><td colspan="4">'+notes+'</td></tr>'
      this.showSumofYears = true

      this.showStraightLineResults =false
     this.showunitofProduction = false
      this.showReducing = false


      },

      unitProductionDepCal()
      {

      //Calculate depreciation based on sum of units of production formula
      var purchasePrice = this.asset.purchase_price;
      var salvageValue = this.asset.salvage_value;
      var usefulYears = this.asset.useful_years;
      var lifeTimeUnits = this.asset.life_time_units;
      var currentUnits  = this.asset.current_units;
      //Check to ensure current units is not greater outer shell units
      var check =lifeTimeUnits-currentUnits
      if(check < 0)
      {
      this.statusError = 'Current units must be equal or less than outer shell units'
      this.isUnitError=true
      return false;
      }
      else
      {
      var depreciableCost = purchasePrice-salvageValue;
        var depreciationRate = depreciableCost/lifeTimeUnits;

        var resultTable ='<table class="table table-striped"><thead><tr><th>Year</th><th>Depreciated Amount</th><th>Book Value</th><th>Acc Depreciation</th></tr></thead>'
        for(var i=0;i<usefulYears;i++)
        {
        resultTable+='<tr><td>Year '+i+'</td><td>value</td><td>Value</td><td>Value</td></tr>'

        }
        var currentDepreciationCost =  depreciationRate*currentUnits;
        //this.results = currentDepreciationCost;
       
     
          this.unitsofProductionResult =this.formatCurrency(currentDepreciationCost)
          console.log(this.unitsofProductionResult)
            this.showunitofProduction = true
            //this.showSumofYears = false
            this.showReducing = false


            }

      },

      formatCurrency(value)
      {
      let val = (value/1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



      },

     /* calculateDepreciation(){
        let uri = 'http://localhost/ims/public/api/assets/depreciation/methods';
         this.axios.get(uri).then((response) => {
                  this.dpmethods = response.data;
                 
              });
       
    },*/
    }
  
}
</script>