function createCampaignCard(campaign) {
    const card = document.createElement('div');
    card.className = 'campaign-card';

    const title = document.createElement('h3');
    title.textContent = campaign.title;
    card.appendChild(title);

    const description = document.createElement('p');
    description.textContent = campaign.description;
    card.appendChild(description);

    const status = document.createElement('span');
    status.className = `status ${campaign.status.toLowerCase()}`;
    status.textContent = campaign.status;
    card.appendChild(status);

    const button = document.createElement('button');
    button.textContent = 'View Details';
    button.onclick = () => {
        // Logic to view campaign details
        console.log(`Viewing details for campaign: ${campaign.title}`);
    };
    card.appendChild(button);

    return card;
}

export { createCampaignCard };