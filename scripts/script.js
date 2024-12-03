const notesList = [
  {
    id: 1,
    title: "Coding JavaScript",
    createdAt: "2024-03-13T20:43:34.067Z",
    completed: false,
  },
  {
    id: 2,
    title: "Study physics",
    createdAt: "2024-02-13T20:43:34.067Z",
    completed: true,
  },
  {
    id: 3,
    title: "React.js intervew",
    createdAt: "2024-01-13T20:43:34.067Z",
    completed: true,
  },
  {
    id: 4,
    title: "Cooking",
    createdAt: "2024-04-13T20:43:34.067Z",
    completed: false,
  },
];


function getSortFilter({search,sort,isComplete,filterBy})
{
    let noteSrch;
    if(search!='')
    {
        noteSrch = notesList.filter(({title})=>title.toLowerCase().includes(search.toLowerCase()))
        if(noteSrch.length)
            displayNote(noteSrch)
    }
    if(sort !='')
    {
        if(noteSrch)
        {
            displayNote(getSort(sort,noteSrch,filterBy))     
        }
        else
        {
            displayNote(getSort(sort,notesList,filterBy))
        } 
    }
}

function displayNote(Notes)
{
    let notess='';
    Notes.length && Notes.map(({id,title,createdAt,completed})=>{

        notess +=`<div class="note">
            <h2>${title}</h2>
            <p>created at : ${createdAt}</p>
            <label>completed : </label>
            <input type="checkbox" ${completed && "checked"}/>
            <p>id : ${id}</p>
        </div>`
    })
    document.querySelector('.notes').innerHTML = notess;
}

function getSort(sort,list,filter)
{
    switch(sort)
    {
        case "ASC":{
            if(filter ==="ID")
            {
                list.sort((a,b)=>a.id-b.id)
            }
            if(filter==="CreatedAt")
            {
                list.sort((a,b)=>{
                    aDate = Date.parse(a.createdAt);
                    bDate = Date.parse(b.createdAt);
                    return aDate-bDate
                })
            }
        }
            
        break;

        case "DESC":
            {
            if(filter ==="ID")
            {
                list.sort((a,b)=>b.id-a.id)
            }
            if(filter==="CreatedAt")
            {
                list.sort((a,b)=>{
                    aDate = Date.parse(a.createdAt);
                    bDate = Date.parse(b.createdAt);
                    return bDate-aDate
                })
            }
        }
        break;
        
    }
    return list;
}

function isComplete(event)
{
    let isCompleted = event.target.value =="true" ? true : false;
    let n =notesList.filter(({completed})=> completed == isCompleted)
    console.log("sss",isCompleted)
    displayNote(n)
}

function onSearch(event)
{
    
    const ascOrDesc = document.querySelector('#ascOrDesc');
    const filterSelect = document.querySelector('#filterSelect');
    filterSelect.addEventListener('change',()=>{
        ascOrDesc.addEventListener('change',()=>{
            getSortFilter({search : event.target.value,sort : ascOrDesc.value,filterBy:filterSelect.value})
            return;
        })
    })    
    getSortFilter({search : event.target.value,sort:"ASC",filterBy:"ID"})

}

displayNote(notesList);