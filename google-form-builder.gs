function createAssistantDemoForm() {
  const form = FormApp.create('Free One-Hour Personalised Assistant Demo');

  form.setDescription(
    'Tell us about your business, how your team works today, and where a personal assistant could help. We will use this to prepare a free one-hour personalised demo.'
  );
  form.setCollectEmail(true);
  form.setConfirmationMessage(
    'Thanks. We will review your workflow and contact you to arrange the free one-hour personalised demo.'
  );

  form.addSectionHeaderItem().setTitle('Contact Details');
  form.addTextItem().setTitle('Business name').setRequired(true);
  form.addParagraphTextItem().setTitle('Business address').setRequired(true);
  form.addTextItem().setTitle('Business website');
  form.addTextItem().setTitle('Contact person').setRequired(true);
  form.addTextItem().setTitle('Contact person role/job title').setRequired(true);
  form.addTextItem().setTitle('Contact email address').setRequired(true);
  form.addTextItem().setTitle('Contact phone number').setRequired(true);

  form.addSectionHeaderItem().setTitle('Business Profile');
  form.addMultipleChoiceItem()
    .setTitle('What type of business are you?')
    .setChoiceValues([
      'Retail',
      'Professional services',
      'Healthcare or care',
      'Hospitality',
      'Construction or trades',
      'Education or training',
      'Technology',
      'Other'
    ])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('How many people are in your team?')
    .setChoiceValues(['1-5', '6-20', '21-50', '51-200', '200+'])
    .setRequired(true);
  form.addParagraphTextItem().setTitle('What services or products do you provide?').setRequired(true);
  form.addParagraphTextItem().setTitle('Who are your main customers?');

  form.addSectionHeaderItem().setTitle('Current Communication');
  form.addParagraphTextItem().setTitle('How does your business use email day to day?').setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Which email platform do you use?')
    .setChoiceValues(['Gmail / Google Workspace', 'Microsoft 365 / Outlook', 'Zoho', 'Other', 'Not sure'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Do you use WhatsApp for business communication?')
    .setChoiceValues(['Yes', 'No', 'Planning to'])
    .setRequired(true);
  form.addMultipleChoiceItem()
    .setTitle('Do you receive customer enquiries by phone?')
    .setChoiceValues(['Yes, often', 'Sometimes', 'Rarely', 'No'])
    .setRequired(true);
  form.addCheckboxItem()
    .setTitle('Which social media platforms do you use?')
    .setChoiceValues(['Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'X / Twitter', 'YouTube', 'None', 'Other']);
  form.addParagraphTextItem().setTitle('How often do you post or respond on social media?');

  form.addSectionHeaderItem().setTitle('Automation Opportunities');
  form.addCheckboxItem()
    .setTitle('Which daily admin tasks repeat the most?')
    .setChoiceValues([
      'Inbox triage',
      'Customer follow-ups',
      'Appointment booking',
      'Phone call notes',
      'Social media replies',
      'Report preparation',
      'Task chasing',
      'Internal handovers',
      'Building apps or dashboards',
      'Other'
    ])
    .setRequired(true);
  form.addParagraphTextItem().setTitle('Which workflows slow your team down?').setRequired(true);
  form.addParagraphTextItem().setTitle('What would you most like a personal assistant to handle?').setRequired(true);
  form.addParagraphTextItem().setTitle('What tools does your team already use?');

  form.addSectionHeaderItem().setTitle('Demo Preparation');
  form.addParagraphTextItem()
    .setTitle('What is one workflow you would like us to look at during the free demo?')
    .setRequired(true);
  form.addParagraphTextItem().setTitle('What would make the demo successful for you?');
  form.addTextItem().setTitle('Preferred date/time for the one-hour demo');

  Logger.log('Published form URL: ' + form.getPublishedUrl());
  Logger.log('Edit form URL: ' + form.getEditUrl());
}
