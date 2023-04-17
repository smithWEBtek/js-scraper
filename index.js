const axios = require("axios"); 
const cheerio = require("cheerio"); 
 
const fetchTitles = async () => { 
	try { 
		// Go to the dev.to tags page 
		// const response = await axios.get("https://dev.to/tags"); 
		const response = await axios.get("https://frugalreality.com/planet-fitness-workout-equipment-list/"); 
 
		// Get the HTML code of the webpage 
		const html = response.data; 
		const $ = cheerio.load(html); 
 
		// Create tags array to store tags 
		const tags = []; 
        const tagChildren = [];
        // let firstTagContents;
        const listItems = [];
        const listItemsDetail = [];

		// Find all elements with crayons-tag class, find their innerText and add them to the tags array 
		// $("a.crayons-tag").each((_idx, el) => tags.push($(el).text())); 
		
        // find all tags with wp-block-heading
        $("h3.wp-block-heading").each((_idx, el) => tags.push($(el).text())); 

        // $("h3.wp-block-heading").each((_idx, el) => tagChildren.push($(el.children))); 
        // $("h3.wp-block-heading").each((_idx, el) => tagChildren.push($(el.children).text())); 
        // $("h3.wp-block-heading").each((_idx, el) => tagChildren.push($(el.children).text())); 

        $('ol').children('li').each((_idx, child) => listItems.push(child));

        // gets descriptions, but the list is not refined completely
        // listItems.forEach(item => listItemsDetail.push(item.children[1].data));
        
        listItems.forEach(item => listItemsDetail.push(item.children[0].children[0].data));
        // [
        //     'Butterfly machine',
        //     'Bicep curl machine',
        //     'Cable triceps bar',
        //     'Cable biceps bar',
        //     'Incline press',
        //     'Chest press',
        //     'Lat pull-down machine',
        //     'AB crunch machine',
        //     'Hanging leg raise machine',
        //     'Decline bench',
        //     'Mountain climber',
        //     'Torso rotation machine',
        //     'Seated machine crunch'
        // ]

        // return listItems[1].children[1].data;
        // return listItems[1].children[1];
        return listItemsDetail;


	} catch (error) { 
		throw error; 
	} 
}; 
 
// Print all tags in the console 
fetchTitles().then(titles => console.log(titles));