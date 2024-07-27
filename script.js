let array=[];
let speed = 100; // Default speed
document.getElementById("speedControl").addEventListener("input", function() {
              speed = this.value;
          });
function generateArray()
{
    array=[];
    document.getElementById("array").innerHTML="";
    for(let i=0;i<30;i++)
    {
        array.push(Math.floor(Math.random()*300)+10);
    }
    displayArray();
}
function displayArray(){
    const arrayDiv=document.getElementById("array");
    array.forEach(value=>{
        const bar=document.createElement("div");
        bar.style.height = value + 'px';
        bar.classList.add('bar');
        arrayDiv.appendChild(bar);
    });
}
async function bubbleSort(){
    for(let i=0;i<array.length;i++)
    {
        for(let j=0;j<array.length-i-1;j++)
        {
            if(array[j]>array[j+1])
            {
                await swap(j,j+1);
            }
        }
    }
    // displayComplexity("Bubble Sort: O(n²) time, O(1) space");
}
async function swap(i,j){
    const arrayDiv = document.getElementById("array");
    const bars=arrayDiv.getElementsByClassName("bar");
    const temp= array[i];
    array[i]=array[j];
    array[j]=temp;
    await displayChange(i);
    await displayChange(j);

}
async function selectionSort(){
    let min;
    for(let i=0;i<array.length;i++)
    {
        min=i;
        for(let j=i+1;j<array.length;j++)
        {
            if(array[j]<array[min])
                min=j;
        }
        if(min!=i)
             await swap(min,i);
    }
}
async function insertionSort(){
    for(let i=1;i<array.length;i++)
    {
        let key=array[i];
        let j=i-1;
        while(j>=0 && array[j]>key)
        {
            array[j+1]=array[j];
            await displayChange(j+1);
            j--;
        }
        array[j+1]=key;
        await displayChange(j+1);
        
        }
      
}
async function mergeSort(){
  await mergeSortHelper(0,array.length-1);
}
async function mergeSortHelper(left,right)
{
    if(left<right)
    {
        const mid=Math.floor((left+right)/2);
        await mergeSortHelper(left,mid);
        await mergeSortHelper(mid+1,right);
        await merge(left,mid,right);
    }
}
async function merge(left,mid,right)
{
    const leftArray = array.slice(left,mid+1);
    const rightArray = array.slice(mid+1,right+1);
    let i=0,j=0,k=left;
    while(i<leftArray.length && j<rightArray.length)
    {
        if(leftArray[i]<=rightArray[j])
        {
            array[k]=leftArray[i];
            i++;
        }
        else
        {
            array[k]=rightArray[j];
            j++;
        }
        await displayChange(k);
        k++;
    }
    while(i<leftArray.length)
    {
        array[k]=leftArray[i];
        await displayChange(k);
        i++;
        k++;

    }
    while(j<rightArray.length)
    {
        array[k]=rightArray[j];
        await displayChange(k);
            j++;
            k++;

    }
}
async function displayChange(index)
{
    const arrayDiv=document.getElementById("array");
    const bars= arrayDiv.getElementsByClassName("bar");
    bars[index].style.height=array[index]+'px';
    await new Promise((resolve) =>setTimeout(resolve,10)); 
        
    
}

generateArray();