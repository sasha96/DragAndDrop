<aura:application access="global" extends="force:slds">

	<aura:attribute name="leftValues" type="Object[]" default="[
	{
	  'label': 'Case, Access to Leading Managers #1',
	  'value': '&lt;b&gt;Case, Access to Leading Managers #1&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	},
	{
	  'label': 'Account, Access to Leading Managers #2',
	  'value': '&lt;b&gt;Account, Access to Leading Managers #2&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	},
	{
	  'label': 'Contact, Access to Leading Managers #3',
	  'value': '&lt;b&gt;Contact, Access to Leading Managers #3&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	},
	{
	  'label': 'Contact, Access to Leading Managers #4',
	  'value': '&lt;b&gt;Contact, Access to Leading Managers #4&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	},
	{
	  'label': 'Opportunity, Access to Leading Managers #5',
	  'value': '&lt;b&gt;Opportunity, Access to Leading Managers #5&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	},
	{
	  'label': 'Lead, Access to Leading Managers #6',
	  'value': '&lt;b&gt;Lead, Access to Leading Managers #6&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	}
  ]" />

	<aura:attribute name="rightValues" type="Object[]" default="[
	{
    
    'label': 'Case, Access to Leading Managers #111',
	  'value': '&lt;b&gt;Case, Access to Leading Managers #111&lt;/b&gt;&lt;span class=\'value_shot_desc\'&gt;&lt;br/&gt;You\'re ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored and ready to capitalize on Adviser Investments\' access to funds that are closed to retail investored&lt;/span&gt;'
	}
	]" />

	<aura:attribute name="leftColumnName" type="String" default="&lt;b&gt;&lt;span style='color:red'&gt;*&lt;/span&gt;Select 3 Key Goals&lt;/b&gt;" />
	<aura:attribute name="rightColumnName" type="String" default="&lt;b&gt;Selected Key Goals&lt;/b&gt;" />



	<c:SL_DualSelect isDraggable="false" leftColumnName="Left Column Name" rightColumnName="Right Column Name" leftValues="{!v.leftValues}"
	 rightValues="{!v.rightValues}" placeHolderSearchTxt="Search Goals..." />


</aura:application>