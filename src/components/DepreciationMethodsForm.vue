<template>
  <div>
  <hr>
  <div class="panel panel-info">
  <div class="panel-heading">
  <div class="panel-title">
  <h2>Fixed Asset Depreciation Calculator</h2>
  </div>
  </div>
  <div class="panel-body">
  <div v-show="guideMessage">
  Provides you with accurate Asset Depreciation Results based on different Methods you select. You don't have to be an accountant to use this application. The notes included in each depreciation method is enough to guide along the right direction.
  </div>
  </div>
  </div>
  <hr>

  <!--Depreciation Methods drop-down-->
  <div class="panel panel-default">
    <div class="panel-heading">
    <div v-cloak>
        <div class="row">
          <div class="col-md-6">
          <div class="form-group" :onload="fetchDepreciationMethods()">
            <label>Select Depreciation Method:</label>
            <select v-model="selected_method" :onchange="loadDeprecianMethodForm()" class="form-control" style="height:40px;" v-validate="'required'" name="depreciation_method">
            <option disabled>Select Depreciation Method</option>
            <option v-for="d in dpmethods" v-bind:value="d.depreciation_method">{{d.depreciation_method}}</option> 
          </select> 
          <div class="help-block alert alert-danger" v-show="errors.has('depreciation_method')">

          {{errors.first('depreciation_method')}}
          </div>

          </div>
          </div>
          </div>
        </div>
    </div>
    </div>

  <!--End of Depreciation Methods Drop-down--> 

<!--This is the result section where results for various depreciation methods are displayed-->

<div class="results">
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



</div>


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
  <form v-on:submit.prevent="straightLineDepCal" name="straightlinefrm">

      <div class="row">
      <div class="col-md-10">
      <div class="form-group">
            <label>Historical Cost (Asset Purchase Price) *:</label>
            <input type="number" class="form-control" v-model="asset.purchase_price" name="straight_purchase_price" placeholed="This is usually the purchase price of the fixed asset" v-validate="'required|min:1'">
            <div class="help-block alert alert-danger" v-show="errors.has('straight_purchase_price')">

          {{errors.first('straight_purchase_price')}}
            </div>
            </div>
      </div>
      
      </div>
      <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Salvage Value:</label>
              <input type="number" class="form-control" v-model="asset.salvage_value" v-validate="'min:0'" name="salvage_value"/>
              <div class="help-block alert alert-danger" v-show="errors.has('salvage_value')">

          {{errors.first('salvage_value')}}
            </div>
            </div>

          </div>
        </div>

        <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years *:</label>
              <input type="number" class="form-control" v-model="asset.useful_years" name="straight_useful_years" v-validate="'required|max_value:99'"/>
              <div class="help-block alert alert-danger" v-show="errors.has('straight_useful_years')">

          {{errors.first('straight_useful_years')}}
            </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-info" :disabled="errors.any()||!isComplete">Calculate</button>

          <button :disabled="!isComplete" class="btn btn-primary"  type="submit">Send Invite</button>

        </div>
      
</form>
  </div>
  <div class="col-md-6 alert alert-info">

  <h3>Help Info!</h3>
  <p><strong>This method spreads the cost of the fixed asset evenly over its useful life.</strong></p>
  <p>When using the straight-line method, the salvage value reduces the depreciable base.
  </p>

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
            <label>Historical Cost (Purchase Price)*:</label>
            <input type="number" name="reducing_bal_purchase_price" class="form-control" v-model="reducingbal.purchase_price" v-validare="'required|min:1'">
            <div class="help-block alert alert-danger" v-show="errors.has('reducing_bal_purchase_')">

          {{errors.first('reducing_bal_purchase_price')}}
            </div>
          </div>
        </div>
        </div>
        

                   
          <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years*:</label>
              <input type="number" class="form-control" v-model="reducingbal.useful_years" name="reducing_bal_useful_years" v-vadiate="'required|max_value:99'" />
              <div class="help-block alert alert-danger" v-show="errors.has('reducing_bal_useful_years')">

          {{errors.first('reducing_bal_useful_years')}}
            </div>
            </div>
          </div>
        </div>
      <div class="form-group">
          <button class="btn btn-info" :disabled="errors.any()||!isCompleteReducingBal">Calculate</button>
        </div>
  </form>

  </div>

  <div class="col-md-7 alert alert-info">
 <h3>Help Info!</h3>
  <p><em>An accelerated method of depreciation, it results in higher depreciation expense in the earlier years of ownership</em></p>
  <p>Don’t deduct salvage value when figuring the depreciable base for the declining balance method. But do limit depreciation so that, at the end of the day, the asset’s net book value is the same as its estimated salvage value.</p>


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
            <label>Historical Cost(Purchase Price)*:</label>
            <input type="number" class="form-control" v-model="asset.purchase_price" name="purchase_price" v-validate="'required|min:1'">
            <div class="help-block alert alert-danger" v-show="errors.has('purchase_price')">

          {{errors.first('purchase_price')}}
            </div>
          </div>
        </div>
        </div>

         <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Salvage Value:</label>
              <input type="number" v-validate="'min:0'" class="form-control" v-model="asset.salvage_value" />
              <div class="help-block alert alert-danger" v-show="errors.has('salvage_value')">

          {{errors.first('salvage_value')}}
            </div>

            </div>
          </div>
        </div>
          
          <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years *:</label>
              <input type="number" class="form-control" v-model="asset.useful_years" name="useful_years" v-validate="'required|max_value:99'"/>
              <div class="help-block alert alert-danger" v-show="errors.has('useful_years')">

          {{errors.first('useful_years')}}
            </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Outer Shells Units:</label>
              <input type="number" class="form-control" v-model="asset.life_time_units" name="outer_shell_units" v-validate="'required|numeric'"/>
              <div class="help-block alert alert-danger" v-show="errors.has('outer_shell_units')">

          {{errors.first('outer_shell_units')}}
            </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Current Units:</label>
              <input type="number" class="form-control" v-model="asset.current_units" name="current_units" v-validate="'required|numeric'"/>
              <div class="help-block alert alert-danger" v-show="errors.has('current_units')">

          {{errors.first('current_units')}}
            </div>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <button :disabled="errors.any() || !isCompleted" class="btn btn-info" :disable="errors.any()">Calculate</button>
          <button :disabled="errors.any() || !isCompleted" class="btn btn-primary"   type="submit">Send Invite</button>

        </div>
        <div class="alert alert-danger" v-show="isUnitError">{{statusError}}</div>
    </form>
  </div>
  <div class="col-md-6 alert alert-info">
  <h3>Help Info!</h3>
  <p><strong>The total estimated number of units the fixed asset will produce over its expected useful life, as compared to the number of units produced in the current accounting period, is used to calculate depreciation expense.</strong></p>
  <p><strong>Outer Shell</strong> Units are the number of units the asset will produce during its useful life</p>
  <p><strong>Current Units</strong>: Number of units produced during the period on which the depreciation is being calculated e.g. a month</p>

  <p>This depreciation method is most suitable for factory machinery</p>

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
            <label>Historical Cost (Purchase Price) *:</label>
            <input type="number" class="form-control" v-model="asset.purchase_price" name="purchase_price" v-validate="'required|numeric'">
            <div class="help-block alert alert-danger" v-show="errors.has('purchase_price')">

          {{errors.first('purchase_price')}}
            </div>
          </div>
        </div>
        </div>
         <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Salvage Value (Default 0):</label>
              <input type="number" class="form-control" v-model="asset.salvage_value" />
            </div>
          </div>
        </div>
          
          <div class="row">
          <div class="col-md-10">
            <div class="form-group">
              <label>Useful Years *:</label>
              <input type="number" class="form-control" v-model="asset.useful_years" name="useful_years" v-validate="'required|numeric'"/>
              <div class="help-block alert alert-danger" v-show="errors.has('useful_years')">

          {{errors.first('useful_years')}}
            </div>
            </div>
          </div>
        </div>
      <div class="form-group">
          <button class="btn btn-primary"  :disabled="errors.any()">Calculate</button>
        </div>

</form>
 </div>
 <div class="col-md-6 alert alert-info">
 <h3>Help Info!</h3>
 <p><strong>Compute depreciation expense by adding all years of the fixed asset’s expected useful life and factoring in which year you are currently in, as compared to the total number of years</strong></p>

 

 
 </div>
 </div>
  </div>
  </div>

</div>
<!-- </SUMOFYEARS>--> 


<!--Display results of unit of production calculation at the bottom of the form since is only a single line -->

<div v-show="unitsofProductionResult">
<jumbotron>
<h3>{{unitsofProductionResult}}</h3>
</jumbotron>
</div>


<!--WARNING MESSAGE-->
<div v-if="showWarning">
<div class="alert alert-warning">
<p>Please click in the dropdown above and choose asset 
depreciation method!</p>
</div>
</div> 


  </div>
</template>

<script>
  export default {
 
    data(){
        return{
        //List of depreciation methods
          dpmethods:
          [{depreciation_method:"Straight Line"},{depreciation_method:"Sum-of-the-years digits"},{depreciation_method:"Declining Balance"},{depreciation_method:"Units-of-production"}],
          /*
          Holds depreciation method currently selected by the user
          */

          selected_method: '',

          /*Hide all depreciation methods forms until the user selects a certain method*/

          showStraightLineForm: false,
          showReducingBalForm: false,
          showUnitofProductionForm:false,
          showSumofYearsForm:false,

          showWarning:false, //Displays a warning message when the user has not selected a depreciation method

          reducingbal:{}, //Stores user input for declining bal depreciation form

          asset:{}, //stores asset values asset inputed by the user
          
          /*These properties will be used to show results for various depreciation methods calculations*/

          showStraightLineResults:false,
          showReducingBalResult:false,
          yearsResult:false,
          showUnitProductionResult:true,
          results:'',

          showReducingBalProjection:false, //Hide and show results for declining bal

          reducingBalProjection:'',
          /*Render html formated calculation results to user from various depreciation methods
          */
          straightLineResult:'',
          reducingBalResult:'',
          sumYearsResult:'',          
          unitsofProductionResult:false ,
          statusError:'', //Hold status error if any

          isUnitError:false, //Show an error if current units exceeds outer shell in units sum of your units depr method
                    
          showReducing:false,
          showunitofProduction:false ,
          showSumofYears:false,
          //Show and hide message displayed in launch form

          guideMessage:false


        }

    },

    beforeMount: function()
        {
          //this.fetchDepreciationMethods();
          this.straightLineDepCal();
          this.reducingBalDepCal();
          this.sumYearsDepCal();
          this.unitProductionDepCal();
        },

    computed: {
  isComplete () {
    return this.straight_purchase_price && this.straight_useful_years;
  },

   isCompleteReducingBal() {
    return reducing_bal_purchase_price && this.reducing_bal_useful_years;
  }
},

        

    methods: {

      fetchDepreciationMethods()
      {
      var _this = this;
      if(!_this.dpmethods.length)
      {
      var dprmethods =[{depreciation_method:"Straight Line",description:"Some description"},{depreciation_method:"Sum of Years ",description:"Some description"},{depreciation_method:"Declining Balance ",description:"Some description"},{depreciation_method:"Unit of Production",description:"Some description"}];
      //return  _this dpmethods.push(dprmethods);
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
      //Perform validation check before executing
      //the function
       this.$validator.validateAll().then(()=>
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
        })
      },

      reducingBalDepCal()
      {
       //Perform validation check before executing the rest of the function
          this.$validator.validateAll().then(()=>
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

      })
      },

  sumYearsDepCal()
      {

//Perform validation check before executing the rest of the function
          this.$validator.validateAll().then(()=>
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
      var counter =0
      var total =0
      var depreciation =0
      var bookvalue = depreciatableValue

      //Generate results in a html table

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
      this.sumYearsResult = resultTable
      this.showSumofYears = true

      this.showStraightLineResults =false
     this.showunitofProduction = false
      this.showReducing = false

      })
      },

      unitProductionDepCal()
      {

//Perform validation check before executing the rest of the function
          this.$validator.validateAll().then(()=>
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
       
     
          this.unitsofProductionResult ="Current Depreciation is: "+this.formatCurrency(currentDepreciationCost)          
            this.showunitofProduction = true
            this.showSumofYears = false
            this.showReducing = false
            showStraightLineResults =false


            }
            })
      },

      formatCurrency(value)
      {
      let val = (value/1).toFixed(2).replace(',', '.');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");



      },

      calculateDepreciation(){
        let uri = 'http://localhost/ims/public/api/assets/depreciation/methods';
         this.axios.get(uri).then((response) => {
                  this.dpmethods = response.data;
                 
              });
       
    },
    }
  
}
</script>