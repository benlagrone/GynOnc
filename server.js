/**
 * Created by blagrone on 8/13/14.
 */

var express = require('express')
    , app = express();

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');


//var cors = require('cors');
//app.use(cors());

app.use(express.json());
app.use(express.urlencoded())
app.use(app.router);
app.use("/", express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded());

app.use(cookieParser());
app.use(cookieSession({ secret: 'app_1' }));


var formObject = {
    formElements:
        [
            {ID:"search",title:"Search",type:"text",placeholder:"Select options below or search here",iconClass:'search'},
            {ID:"target",title:"Target",type:"select",placeholder:"Select a Disease Site",iconClass:'crosshairs'},
            {ID:"biomarker",title:"BioMarker Driven Trials",type:"select",placeholder:"Select a Genomic Target",iconClass:'bug'},
            //{ID:"facility",title:"Facility",type:"select",placeholder:"Select a Facility",iconClass:'hospital-o'}
        ]};

var target = {
    formOptions:
        [
            {ID:"ovary",label:"Ovary"},
            {ID:"endometrial",label:"Endometrial"},
            {ID:"cervix",label:"Cervix"},
            {ID:"othergyn",label:"Other Gyn"}
        ]};
var targetOvaryChildren = {
    formOptions:[
        {ID:"histology",title:"Histology",type:"select",placeholder:"Select a Histology",iconClass:'crosshairs'},
        {ID:"typeofTrial",title:"Type of Trial",type:"select",placeholder:"Select a Type of Trial",iconClass:'crosshairs'}
    ]
};
var targetEndometrialChildren = {
    formOptions: [
        {ID: "histology", title: "Histology", type: "select", placeholder: "Select a Disease Site", iconClass: 'crosshairs'},
        {ID: "typeofTrial", title: "Type of Trial", type: "select", placeholder: "Select a Disease Site", iconClass: 'crosshairs'},
        {ID: "stageofdisease", title: "Stage of Disease", type: "select", placeholder: "Select a Disease Site", iconClass: 'crosshairs'}
    ]
};
var targetCervixChildren ={
    formOptions:[
        {ID:"histology",title:"Histology",type:"select",placeholder:"Select a Disease Site",iconClass:'crosshairs'},
        {ID:"typeofTrial",title:"Type of Trial",type:"select",placeholder:"Select a Disease Site",iconClass:'crosshairs'},
        {ID:"stageofdisease",title:"Stage of Disease",type:"select",placeholder:"Select a Disease Site",iconClass:'crosshairs'}
    ]
};
var targetOtherChildren = {
    formOptions:[
        {ID:"histology",title:"Histology",type:"select",placeholder:"Select a Disease Site",iconClass:'crosshairs'},
        {ID:"otherdiseasesite",title:"Disease Site",type:"select",placeholder:"Select a Disease Site",iconClass:'crosshairs'}
    ]
};
var OvaryHistology = {
    formOptions:
        [
            {ID:"highgradeserrous",label:"High Grade Serous",group:""},
            {ID:"lowgrade",label:"Low Grade",group:""},
            {ID:"clearcell",label:"Clear Cell",group:""},
            {ID:"endometrial",label:"Endometrial",group:""},
            {ID:"mucinous",label:"Mucinous",group:""},
            {ID:"mixed",label:"Mixed",group:""},
            {ID:"germcell",label:"Germ Cell",group:""},
            {ID:"stromal",label:"Stromal",group:""},
            {ID:"smallcell",label:"Small Cell",group:""},
            {ID:"metastatic",label:"metastatic",group:""},
            {ID:"sarcoma",label:"Sarcoma",group:""},
            {ID:"other",label:"Other",group:""}
        ]
};
var endometrialHistology = {
    formOptions:[
        {ID:"endometrioid",label:"Endometrioid",group:"epithelial"},
        {ID:"MMMT",label:"MMMT",group:"epithelial"},
        {ID:"squamous",label:"Squamous",group:"epithelial"},
        {ID:"mixed",label:"Mixed",group:"epithelial"},
        {ID:"USC",label:"USC",group:"epithelial"},
        {ID:"clearcell",label:"Clear Cell",group:"epithelial"},
        {ID:"LMS",label:"LMS",group:"sarcoma"},
        {ID:"ESS",label:"ESS",group:"sarcoma"},
        {ID:"MMMT",label:"MMMT",group:"sarcoma"},
        {ID:"Neuroendocrine",label:"Neuroendocrine",group:"other"},
        {ID:"NOS",label:"NOS",group:"other"}
    ]
};
var cervixHistology ={
    formOptions:[
        {ID:"squamous",label:"Squamous",group:""},
        {ID:"adeno",label:"Adeno",group:""},
        {ID:"adenosquamous",label:"Adenosquamous",group:""},
        {ID:"neuroendocrine",label:"Neuroendocrine",group:""},
        {ID:"smallcell",label:"Small Cell",group:""},
        {ID:"sarcoma",label:"Sarcoma",group:""},
        {ID:"other",label:"Other",group:""}
    ]
};
var otherHistology = {
    formOptions:[
        {ID:"squamous",label:"Squamous",group:"epithelial"},
        {ID:"non-squamous",label:"Non-Squamous",group:"epithelial"},
        {ID:"melanoma",label:"Melanoma",group:""},
        {ID:"sarcoma",label:"Sarcoma",group:""},
        {ID:"other",label:"Other",group:""}
    ]
};
var histology = {
    types:
        [{parent:"cervix",label:"Histology",
            formOptions:[]},
            {parent:"other",label:"Other Disease Site",
            formOptions:[]}
        ]};
var otherDiseaseSite = {
    formOptions:[
        {ID:"vulva",label:"Vulva"},
        {ID:"vagina",label:"Vagina"},
        {ID:"GTD",label:"GTD"},
        {ID:"other",label:"Other"}
    ]};
var biomarker = {
    formOptions:
    [
        {ID:"BRCA12",label:"BRCA 1/2"},
        {ID:"BRCA2",label:"BRCA 2"},
        {ID:"EphA2",label:"EphA2"},
        {ID:"Pik3Ca",label:"Pik3Ca"},
        {ID:"PTEN",label:"PTEN"},
        {ID:"KRAS",label:"KRAS"},
        {ID:"BRAF",label:"BRAF"},
        {ID:"FGFR",label:"FGFR"},
        {ID:"P53",label:"P53"},
        {ID:"WT1",label:"WT1"},
        {ID:"ERPRARLH",label:"ERPRARLH"},
        {ID:"other",label:"other"},
        {ID:"skip",label:"Skip this criteria"}
    ]};
var facility = {
    formOptions: [
        {ID:"0",label:"MDACC", address: "17198 St. Luke's Way", city: "The Woodlands", state: "TX", zip: "77384"},
        {ID:"1",label:"Other 1", address: "17198 St. Luke's Way", city: "The Woodlands", state: "TX", zip: "77384"}
    ]};
var ovaryTypeofTrial ={
    formOptions: [
        {ID:"primarytreatment",label: "Primary Treatment"
            //, children:[{ID:"measurabledisease",title:"Measurable Disease",type:"select",placeholder:"Does the patient have a measurable disease?",iconClass:'crosshairs'}]
    },
        {ID:"primarymaintenance",label: "Primary Maintenance"
            //, children:[{ID:"macropositive",title:"Macro-Positive",type:"select",placeholder:"Patient is...",iconClass:'crosshairs'}]
        },
        {ID:"recurrence",label: "Recurrence"
            /*, children:[
            {ID:"platinumsensitive",title:"Macro-Sensitive",type:"select",placeholder:"Patient is...",iconClass:'crosshairs'},
            {ID:"measurabledisease",title:"Has Measurable Disease",type:"select",placeholder:"Select an option",iconClass:'crosshairs'},
            {ID:"recurrance",title:"Number of Prior Therapies for Recurrence",type:"select",placeholder:"Select a number",iconClass:'crosshairs'}]*/
        },
        {ID:"recurrencemaintenance",label: "Recurrence Maintenance"}
    ]
};
var ovarytypeoftrialprimarytreatmentchildren = {
    formOptions:[{ID:"measurabledisease",title:"Measurable Disease",type:"select",placeholder:"Does the patient have a measurable disease?",iconClass:'crosshairs'}]
};
var ovarytypeoftrialprimarymaintenancechildren = {
    formOptions:[{ID:"macropositive",title:"Macro-Positive",type:"select",placeholder:"Patient is...",iconClass:'crosshairs'}]
};
var ovarytypeoftrialrecurrencechildren = {
    formOptions:[
        {ID:"platinumsensitive",title:"Macro-Sensitive",type:"select",placeholder:"Patient is...",iconClass:'crosshairs'},
        {ID:"measurabledisease",title:"Has Measurable Disease",type:"select",placeholder:"Select an option",iconClass:'crosshairs'},
        {ID:"recurrance",title:"Number of Prior Therapies for Recurrence",type:"select",placeholder:"Select a number",iconClass:'crosshairs'}
    ]
};
var ovarytypeoftrialrecurrencemaintenancechildren = {
    formOptions:[]
};
var ovaryprimarytreatmentmeasurabledisease ={
    formOptions:[
        {ID:"Yes",label:"Yes"},
        {ID:"No",label:"No"}
    ]
};
var ovaryprimarymaintenancemacropositive ={
    formOptions:[
        {ID:"Macro-positive",label:"Macro-Positive"},
        {ID:"Micro-Positive",label:"Micro-Positive"},
        {ID:"Negative",label:"Negative"},
        {ID:"Unknown",label:"Unknown"}
    ]
};
var ovaryrecurrenceplatinumsensitive = {
    formOptions:[
        {ID:"PlatinumSensitive",label:"Platinum Sensitive"},
        {ID:"PlatinumResistant",label:"Platinum Resistant"},
        {ID:"Unknown",label:"Unknown"},
        {ID:"Skip",label:"Skip this Criteria"}
    ]
}
var ovaryrecurrencenumberofpriortherapiesforrecurrance={
    formOptions:[
        {ID:"0",label:"0"},
        {ID:"1",label:"1"},
        {ID:"2",label:"2"},
        {ID:"3plus",label:"3+"}
    ]
};
var ovaryrecurrancemaintenancemaintenance={
    formOptions:[]
};
var targetendometrialprimarytreatment = {
    formOptions:[
        {ID:"measurabledisease",title:"Has Measurable Disease",type:"select",placeholder:"Select an option",iconClass:'crosshairs'}
    ]
};
var targetendometrialprimarymaintenance = {
    formOptions:[
        {ID:"measurabledisease",title:"Has Measurable Disease",type:"select",placeholder:"Select an option",iconClass:'crosshairs'}
    ]
};
var targetendometrialrecurrence = {
    formOptions:[
        {ID:"measurabledisease",title:"Has Measurable Disease",type:"select",placeholder:"Select an option",iconClass:'crosshairs'},
        {ID:"recurrance",title:"Number of Prior Therapies for Recurrence",type:"select",placeholder:"Select a number",iconClass:'crosshairs'}
    ]
};
var targetendometrialrecurrencemaintenance = {
    formOptions:[
        {ID:"recurrance",title:"Number of Prior Therapies for Recurrence",type:"select",placeholder:"Select a number",iconClass:'crosshairs'}
    ]
};
var ovaryrecurrencemeasurabledisease={
    formOptions:[
        {ID:"Yes",label:"Yes"},
        {ID:"No",label:"No"},
        {ID:"Unknown",label:"Unknown"},
        {ID:"Skip",label:"Skip this criteria"}
    ]
};
var ovaryrecurrencerecurrance={
    formOptions:[
        {ID:"0",label:"0"},
        {ID:"1",label:"1"},
        {ID:"2",label:"2"},
        {ID:"3plus",label:"3+"}
    ]
};
var typeofTrial = {
    types: [
        {parent: "ovary",label: "Histology",
            formOptions: [
                {ID:"primarytreatment",label: "Primary Treatment"},
                {ID:"primarymaintenance",label: "Primary Maintenance"},
                {ID:"recurrence",label: "Recurrence"},
                {ID:"recurrencemaintenance",label: "Recurrence Maintenance"}
            ]
        },
        {parent: "endometrial",label: "Histology",
            formOptions: [
                {ID:"primarytreatment",label: "Primary Treatment"},
                {ID:"primarymaintenance",label: "Primary Maintenance"},
                {ID:"recurrence",label: "Recurrence"},
                {ID:"recurrencemaintenance",label: "Recurrence Maintenance"}
            ]
        },
        {parent: "cervix",label: "Histology",
            formOptions: [
                {ID:"primarytreatment",label: "Primary Treatment"},
                {ID:"primarymaintenance",label: "Primary Maintenance"},
                {ID:"recurrence",label: "Recurrence"},
                {ID:"recurrencemaintenance",label: "Recurrence Maintenance"}
            ]
        }
    ]};
var endometrialtypeoftrial = {
    formOptions: [
    {ID:"primarytreatment",label: "Primary Treatment"},
    {ID:"primarymaintenance",label: "Primary Maintenance"},
    {ID:"recurrence",label: "Recurrence"},
    {ID:"recurrencemaintenance",label: "Recurrence Maintenance"}
]
};
var endometrialstageofdisease = {
    formOptions:[
    {ID:"I",label:"I"},
    {ID:"II",label:"II"},
    {ID:"III",label:"III"},
    {ID:"IV",label:"IV"}
]
};
var stageofDisease = {
    type:[
        {parent: "endometrial",label: "Histology",formOptions:[
            {ID:"I",label:"I"},
            {ID:"II",label:"II"},
            {ID:"III",label:"III"},
            {ID:"IV",label:"IV"}
        ]
        },
        {parent: "cervix",label: "Histology",formOptions:[
            {ID:"I",label:"I"},
            {ID:"II",label:"II"},
            {ID:"III",label:"III"},
            {ID:"IV",label:"IV"}
        ]
        }
    ]};

var filteredList4 = {
    list:[
        {id:0,title:"Clinical Trial 0",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:1,title:"Clinical Trial 1",protocol:1234567,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:2,title:"Clinical Trial 2",protocol:2345678,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:3,title:"Clinical Trial 3",protocol:3456789,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:4,title:"Clinical Trial 4",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."}
    ]
};

var filteredList3 = {
    list:[
        {id:0,title:"Clinical Trial 0",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:1,title:"Clinical Trial 1",protocol:1234567,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:2,title:"Clinical Trial 2",protocol:2345678,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:3,title:"Clinical Trial 3",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
    ]
};
var filteredList2 = {
    list:[
        {id:0,title:"Clinical Trial 0",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:1,title:"Clinical Trial 1",protocol:1234567,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:2,title:"Clinical Trial 2",protocol:2345678,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
    ]
};
var filteredList1 = {
    list:[
        {id:0,title:"Clinical Trial 0",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
        {id:1,title:"Clinical Trial 1",protocol:1234567,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
    ]
};
var filteredList0 = {
    list:[
        {id:0,title:"Clinical Trial 0",protocol:0123456,description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vitae finibus nisl. Sed id ligula in lorem bibendum accumsan ac eu felis. Pellentesque vestibulum tellus at diam cursus, sed faucibus lectus pharetra. Proin felis risus, accumsan non metus nec, mattis condimentum augue. Suspendisse potenti."},
    ]
};
app.get('/hello.txt', function (req, res) {
    res.send('patient referral form');
});

//app.get('/initComponents',function(req,res){
//    res.send(formObject)
//});

app.get('/initComponents/:group',function(req,res){
	var requestedGroup = req.param('group');
	switch(requestedGroup){
		case ':gynonc':
			res.send(formObject);
			break;
		case ':foo':
			res.send(formObject);
			break;
	}
});
app.get('/filterInputs/:parent',function(req,res){
    var requestedFields = req.param("parent");
    switch(requestedFields){
        case ':init':
            res.send(formObject);
            break;
        case ':foo':
            res.send(foo);
            break;
    }
});
app.get('/options/:form',function(req,res){
    var requestedItem = req.param("form");
    switch(requestedItem){
        case ':target':
            res.send(target);
            break;
        case ':biomarker':
            res.send(biomarker);
            break;
        case ':facility':
            res.send(facility);
            break;
        case ':ovaryhistology':
            res.send(OvaryHistology);
            break;
        case ':endometrialhistology':
            res.send(endometrialHistology);
            break;
        case ':cervixhistology':
            res.send(cervixHistology);
            break;
        case ':otherhistology':
            res.send(cervixHistology);
            break;
        case ':ovarytypeofTrial':
            res.send(ovaryTypeofTrial);
            break;
        case ':ovarytypeofTrial':
            res.send(ovaryTypeofTrial);
            break;
        case ':ovaryprimarytreatmentmeasurabledisease':
            res.send(ovaryprimarytreatmentmeasurabledisease);
            break;
        case ':ovaryprimarymaintenancemacropositive':
            res.send(ovaryprimarymaintenancemacropositive);
            break;
        case ':ovaryrecurrenceplatinumsensitive':
            res.send(ovaryrecurrenceplatinumsensitive);
            break;
        case ':ovaryrecurrencemeasurabledisease':
            res.send(ovaryrecurrencemeasurabledisease);
            break;
        case ':ovaryrecurrencerecurrance':
            res.send(ovaryrecurrencerecurrance);
            break;
        case':endometrialtypeofTrial':
            res.send(endometrialtypeoftrial);
            break;
        case ':endometrialstageofdisease':
            res.send(endometrialstageofdisease);
            break;
        default:
            res.send({noOptions:"this has no options"});
            break;
    }
});
app.get('/children/:parent',function(req,res){
    var requestedItem = req.param("parent");
    switch(requestedItem){
        case':targetovary':
            res.send(targetOvaryChildren);
            break;
        case':targetendometrial':
            res.send(targetEndometrialChildren);
            break;
        case':targetcervix':
            res.send(targetCervixChildren);
            break;
        case':targetother':
            res.send(targetOtherChildren);
            break;
        case':targetovaryprimarytreatment':
            res.send(ovarytypeoftrialprimarytreatmentchildren);
            break;
        case':targetovaryprimarymaintenance':
            res.send(ovarytypeoftrialprimarymaintenancechildren);
            break;
        case':targetovaryrecurrence':
            res.send(ovarytypeoftrialrecurrencechildren);
            break;
        case':targetovaryrecurrencemaintenance':
            res.send(ovarytypeoftrialrecurrencemaintenancechildren);
            break;
        case':targetendometrialprimarytreatment':
            res.send(targetendometrialprimarytreatment);
            break;
        case':targetendometrialprimarymaintenance':
            res.send(targetendometrialprimarymaintenance);
            break;
        case':targetendometrialrecurrence':
            res.send(targetendometrialrecurrence);
            break;
        case':targetendometrialrecurrencemaintenance':
            res.send(targetendometrialrecurrencemaintenance);
            break;
        default:
            res.send({noChildren:"Your request has no children"});
            break;
    }
});

var requestCount = 0;
app.post('/submitfilter',function(req,res){
    console.log(requestCount)
    switch(requestCount){
        case 0:
            console.log(0);
            requestCount+=1;
            res.send(filteredList4);
            break;
        case 1:
            console.log(1);
            requestCount+=1;
            res.send(filteredList3);
            break;
        case 2:
            console.log(2);
            requestCount+=1;
            res.send(filteredList2);
            break;
        case 3:
            console.log(3);
            requestCount+=1;
            res.send(filteredList1);
            break;
        case 4:
            console.log(4);
            res.send(filteredList0);
            requestCount=0;
            break;
    }

});

app.post('/submitinquiry',function(req,res){
    console.log(req.body)
    res.send("hooray")
})

var server = app.listen(5400, function () {
    console.log('listening on port %d', server.address().port);
});


