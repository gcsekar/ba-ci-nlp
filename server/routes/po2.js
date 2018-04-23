var express = require('express');
var router = express.Router();
var http = require('http');

/* GET users listing. */
router.get('/', function(req, res, next) {
	//	res.send('respond with	 a PO resource');
	var data = "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\r\n<!DOCTYPE PurchaseOrderMessage SYSTEM \"http://daffy.sciquest.com/app_docs/dtd/po/PO.dtd\">\r\n<PurchaseOrderMessage version=\"3.0\">\r\n\t<Header>\r\n\t\t<MessageId>A999</MessageId>\r\n\t\t<Timestamp>2018-05-31T13:50:23.848-04:00</Timestamp>\r\n\t\t<Authentication>\r\n\t\t\t<Identity>30001144</Identity>\r\n\t\t\t<SharedSecret>30001144</SharedSecret>\r\n\t\t</Authentication>\r\n\t</Header>\r\n\t<PurchaseOrder>\r\n   <POHeader>\r\n      <RevisionNumber>0</RevisionNumber>\r\n      <RevisionDate/>\r\n      <!-- This needs to be unique and can be the key for searching for the PO once created -->\r\n      <PONumber>100011190</PONumber>\r\n      <AlternatePONumber />\r\n      <Requestor>\r\n         <UserProfile username=\"_sq_szukowski\">\r\n            <FirstName>Amen</FirstName>\r\n            <LastName>IoT Device</LastName>\r\n            <Email>Amen@IotDevice2.com</Email>\r\n         </UserProfile>\r\n      </Requestor>\r\n      <Priority>Normal</Priority>\r\n      <CreateDateTime/>\r\n      <InitialRevisionDateTime/>\r\n      <!-- This is the supplier of the item that you are purchasing from -->\r\n      <Supplier id=\"19613\">\r\n         <Name>Alexis Corp.</Name>\r\n         <FulfillmentAddressInternalId>19613</FulfillmentAddressInternalId>\r\n         <ContactInfo type=\"main\">\r\n            <Phone>\r\n               <TelephoneNumber>\r\n                  <CountryCode>1</CountryCode>\r\n                  <AreaCode>919</AreaCode>\r\n                  <Number>6592100</Number>\r\n               </TelephoneNumber>\r\n            </Phone>\r\n            <Fax>\r\n               <TelephoneNumber>\r\n                  <CountryCode>245100</CountryCode>\r\n                  <AreaCode>1</AreaCode>\r\n                  <Number>602</Number>\r\n                  <Extension>9</Extension>\r\n               </TelephoneNumber>\r\n            </Fax>\r\n            <Email>axxoraus@axfxora.com</Email>\r\n            <ContactAddress>\r\n               <AddressLine linenumber=\"1\">6181 Cornerstone Ct., East</AddressLine>\r\n               <AddressLine linenumber=\"2\">Suite 103</AddressLine>\r\n               <City>San Diego</City>\r\n               <State>CA</State>\r\n               <PostalCode>94121</PostalCode>\r\n               <Country isocountrycode=\"US\">United States</Country>\r\n            </ContactAddress>\r\n         </ContactInfo>\r\n      </Supplier>\r\n      <BillTo>\r\n         <Address>\r\n            <TemplateName>Test Bill To 1</TemplateName>\r\n            <AddressCode>TestBillTo1</AddressCode>\r\n            <Contact label=\"Contact Line 1\" linenumber=\"1\">Attention</Contact>\r\n            <AddressLine label=\"Address Line 1\" linenumber=\"1\">102 Rainbow Street</AddressLine>\r\n            <City>Oz</City>\r\n            <State>NC</State>\r\n            <PostalCode>23424</PostalCode>\r\n            <Country isocountrycode=\"IT\">Italy</Country>\r\n         </Address>\r\n      </BillTo>\r\n      <ShipTo>\r\n         <Address>\r\n            <TemplateName>Test Ship To</TemplateName>\r\n            <AddressCode>TestShipTo</AddressCode>\r\n            <Contact label=\"Contact Line 1\" linenumber=\"1\">Attention</Contact>\r\n            <AddressLine label=\"Address Line 1\" linenumber=\"1\">123 Easy Street</AddressLine>\r\n            <City>Annietown</City>\r\n            <State>NC</State>\r\n            <PostalCode>27615</PostalCode>\r\n            <Country isocountrycode=\"IT\">Italy</Country>\r\n         </Address>\r\n      </ShipTo>\r\n      <PaymentInfo>\r\n         <Terms>\r\n            <Discount unit=\"percent\">4</Discount>\r\n            <Days>9</Days>\r\n            <Net>29</Net>\r\n         </Terms>\r\n         <PaymentType>ExacTrac</PaymentType>\r\n      </PaymentInfo>\r\n      <InternalInfo />\r\n      <FreightOnBoard>N/A</FreightOnBoard>\r\n   </POHeader>\r\n   <!-- This is the product that you are purchasing -->\r\n   <POLine linenumber=\"1\" >\r\n      <WorkflowStatus status=\"Approved\" />      \r\n      <Item>\r\n         <CatalogNumber>5221717</CatalogNumber>\r\n         <Description><![CDATA[Holloween Day]]></Description>\r\n         <ProductUnitOfMeasure type=\"system\">\r\n            <Measurement>\r\n               <MeasurementAmount>1.0</MeasurementAmount>\r\n               <MeasurementUnit>BX</MeasurementUnit>\r\n               <MeasurementValue>1.0 BX</MeasurementValue>\r\n            </Measurement>\r\n         </ProductUnitOfMeasure>\r\n         <ProductUnitOfMeasure type=\"buyer\">\r\n            <Measurement>\r\n               <MeasurementAmount>1.0</MeasurementAmount>\r\n               <MeasurementUnit>BX</MeasurementUnit>\r\n               <MeasurementValue>1.0 BX</MeasurementValue>\r\n            </Measurement>\r\n         </ProductUnitOfMeasure>\r\n         <ProductUnitOfMeasure type=\"supplier\">\r\n            <Measurement>\r\n               <MeasurementAmount>1.0</MeasurementAmount>\r\n               <MeasurementUnit>BX</MeasurementUnit>\r\n               <MeasurementValue>1.0 BX</MeasurementValue>\r\n            </Measurement>\r\n         </ProductUnitOfMeasure>\r\n         <CommodityCode></CommodityCode>\r\n         <ProductType>Form</ProductType>\r\n         <ProductClassification type=\"Controlled\">false</ProductClassification>\r\n         <ProductClassification type=\"Green\">false</ProductClassification>\r\n         <ProductClassification type=\"Hazardous\">false</ProductClassification>\r\n      </Item>\r\n      <Quantity>100</Quantity>\r\n      <CapitalExpense>false</CapitalExpense>\r\n      <FixedAsset>false</FixedAsset>\r\n      <Taxable>false</Taxable>\r\n      <LineCharges>\r\n         <UnitPrice>\r\n            <Money currency=\"USD\">8.64</Money>\r\n            <PriceSource>Manual</PriceSource>\r\n         </UnitPrice>\r\n      </LineCharges>\r\n      <DeliveryInfo>\r\n      <Expedite value=\"No\"/>\r\n         <ShippingMethod id=\"0\">\r\n            <Carrier id=\"0\">Best Carrier</Carrier>\r\n            <MethodName>Best Way</MethodName>\r\n            <MethodDisplayText>Best Carrier-Best Way</MethodDisplayText>\r\n         </ShippingMethod>\r\n         <RequestedDeliveryDate>2018-05-01</RequestedDeliveryDate>\r\n      </DeliveryInfo>\r\n      <RequisitionLineRef id=\"\" />\r\n   </POLine>\r\n</PurchaseOrder>\r\n</PurchaseOrderMessage>\r\n\r\n";

	var settings = {
		"async" : true,
		"crossDomain" : true,
		"url" : "http://usertest.sciquest.com/apps/Router/POXMLImport",
		"method" : "POST",
		"headers" : {
			"Content-Type" : "application/xml",
			"Cache-Control" : "no-cache",
			"Postman-Token" : "a5864920-3293-d7cc-db95-412c85ee4b1f"
		},
		"data" : "<?xml version=\"1.0\" encoding=\"UTF-8\" ?>\r\n<!DOCTYPE PurchaseOrderMessage SYSTEM \"http://daffy.sciquest.com/app_docs/dtd/po/PO.dtd\">\r\n<PurchaseOrderMessage version=\"3.0\">\r\n\t<Header>\r\n\t\t<MessageId>A999</MessageId>\r\n\t\t<Timestamp>2018-05-31T13:50:23.848-04:00</Timestamp>\r\n\t\t<Authentication>\r\n\t\t\t<Identity>30001144</Identity>\r\n\t\t\t<SharedSecret>30001144</SharedSecret>\r\n\t\t</Authentication>\r\n\t</Header>\r\n\t<PurchaseOrder>\r\n   <POHeader>\r\n      <RevisionNumber>0</RevisionNumber>\r\n      <RevisionDate/>\r\n      <!-- This needs to be unique and can be the key for searching for the PO once created -->\r\n      <PONumber>100011190</PONumber>\r\n      <AlternatePONumber />\r\n      <Requestor>\r\n         <UserProfile username=\"_sq_szukowski\">\r\n            <FirstName>Amen</FirstName>\r\n            <LastName>IoT Device</LastName>\r\n            <Email>Amen@IotDevice2.com</Email>\r\n         </UserProfile>\r\n      </Requestor>\r\n      <Priority>Normal</Priority>\r\n      <CreateDateTime/>\r\n      <InitialRevisionDateTime/>\r\n      <!-- This is the supplier of the item that you are purchasing from -->\r\n      <Supplier id=\"19613\">\r\n         <Name>Alexis Corp.</Name>\r\n         <FulfillmentAddressInternalId>19613</FulfillmentAddressInternalId>\r\n         <ContactInfo type=\"main\">\r\n            <Phone>\r\n               <TelephoneNumber>\r\n                  <CountryCode>1</CountryCode>\r\n                  <AreaCode>919</AreaCode>\r\n                  <Number>6592100</Number>\r\n               </TelephoneNumber>\r\n            </Phone>\r\n            <Fax>\r\n               <TelephoneNumber>\r\n                  <CountryCode>245100</CountryCode>\r\n                  <AreaCode>1</AreaCode>\r\n                  <Number>602</Number>\r\n                  <Extension>9</Extension>\r\n               </TelephoneNumber>\r\n            </Fax>\r\n            <Email>axxoraus@axfxora.com</Email>\r\n            <ContactAddress>\r\n               <AddressLine linenumber=\"1\">6181 Cornerstone Ct., East</AddressLine>\r\n               <AddressLine linenumber=\"2\">Suite 103</AddressLine>\r\n               <City>San Diego</City>\r\n               <State>CA</State>\r\n               <PostalCode>94121</PostalCode>\r\n               <Country isocountrycode=\"US\">United States</Country>\r\n            </ContactAddress>\r\n         </ContactInfo>\r\n      </Supplier>\r\n      <BillTo>\r\n         <Address>\r\n            <TemplateName>Test Bill To 1</TemplateName>\r\n            <AddressCode>TestBillTo1</AddressCode>\r\n            <Contact label=\"Contact Line 1\" linenumber=\"1\">Attention</Contact>\r\n            <AddressLine label=\"Address Line 1\" linenumber=\"1\">102 Rainbow Street</AddressLine>\r\n            <City>Oz</City>\r\n            <State>NC</State>\r\n            <PostalCode>23424</PostalCode>\r\n            <Country isocountrycode=\"IT\">Italy</Country>\r\n         </Address>\r\n      </BillTo>\r\n      <ShipTo>\r\n         <Address>\r\n            <TemplateName>Test Ship To</TemplateName>\r\n            <AddressCode>TestShipTo</AddressCode>\r\n            <Contact label=\"Contact Line 1\" linenumber=\"1\">Attention</Contact>\r\n            <AddressLine label=\"Address Line 1\" linenumber=\"1\">123 Easy Street</AddressLine>\r\n            <City>Annietown</City>\r\n            <State>NC</State>\r\n            <PostalCode>27615</PostalCode>\r\n            <Country isocountrycode=\"IT\">Italy</Country>\r\n         </Address>\r\n      </ShipTo>\r\n      <PaymentInfo>\r\n         <Terms>\r\n            <Discount unit=\"percent\">4</Discount>\r\n            <Days>9</Days>\r\n            <Net>29</Net>\r\n         </Terms>\r\n         <PaymentType>ExacTrac</PaymentType>\r\n      </PaymentInfo>\r\n      <InternalInfo />\r\n      <FreightOnBoard>N/A</FreightOnBoard>\r\n   </POHeader>\r\n   <!-- This is the product that you are purchasing -->\r\n   <POLine linenumber=\"1\" >\r\n      <WorkflowStatus status=\"Approved\" />      \r\n      <Item>\r\n         <CatalogNumber>5221717</CatalogNumber>\r\n         <Description><![CDATA[Holloween Day]]></Description>\r\n         <ProductUnitOfMeasure type=\"system\">\r\n            <Measurement>\r\n               <MeasurementAmount>1.0</MeasurementAmount>\r\n               <MeasurementUnit>BX</MeasurementUnit>\r\n               <MeasurementValue>1.0 BX</MeasurementValue>\r\n            </Measurement>\r\n         </ProductUnitOfMeasure>\r\n         <ProductUnitOfMeasure type=\"buyer\">\r\n            <Measurement>\r\n               <MeasurementAmount>1.0</MeasurementAmount>\r\n               <MeasurementUnit>BX</MeasurementUnit>\r\n               <MeasurementValue>1.0 BX</MeasurementValue>\r\n            </Measurement>\r\n         </ProductUnitOfMeasure>\r\n         <ProductUnitOfMeasure type=\"supplier\">\r\n            <Measurement>\r\n               <MeasurementAmount>1.0</MeasurementAmount>\r\n               <MeasurementUnit>BX</MeasurementUnit>\r\n               <MeasurementValue>1.0 BX</MeasurementValue>\r\n            </Measurement>\r\n         </ProductUnitOfMeasure>\r\n         <CommodityCode></CommodityCode>\r\n         <ProductType>Form</ProductType>\r\n         <ProductClassification type=\"Controlled\">false</ProductClassification>\r\n         <ProductClassification type=\"Green\">false</ProductClassification>\r\n         <ProductClassification type=\"Hazardous\">false</ProductClassification>\r\n      </Item>\r\n      <Quantity>100</Quantity>\r\n      <CapitalExpense>false</CapitalExpense>\r\n      <FixedAsset>false</FixedAsset>\r\n      <Taxable>false</Taxable>\r\n      <LineCharges>\r\n         <UnitPrice>\r\n            <Money currency=\"USD\">8.64</Money>\r\n            <PriceSource>Manual</PriceSource>\r\n         </UnitPrice>\r\n      </LineCharges>\r\n      <DeliveryInfo>\r\n      <Expedite value=\"No\"/>\r\n         <ShippingMethod id=\"0\">\r\n            <Carrier id=\"0\">Best Carrier</Carrier>\r\n            <MethodName>Best Way</MethodName>\r\n            <MethodDisplayText>Best Carrier-Best Way</MethodDisplayText>\r\n         </ShippingMethod>\r\n         <RequestedDeliveryDate>2018-05-01</RequestedDeliveryDate>\r\n      </DeliveryInfo>\r\n      <RequisitionLineRef id=\"\" />\r\n   </POLine>\r\n</PurchaseOrder>\r\n</PurchaseOrderMessage>\r\n\r\n"
	}

	var req = http.request({
		url : 'http://usertest.sciquest.com/apps/Router/POXMLImport',
		body : data,
		headers : {
			'Content-Type' : 'text/xml',
			"Cache-Control" : "no-cache",
			"Postman-Token" : "a5864920-3293-d7cc-db95-412c85ee4b1f"
		}
	}, function(res) {
		var output = '';
		res.setEncoding('utf8');

		res.on('data', function(chunk) {
			output += chunk;
		});

		res.on('end', function() {
			onResult(res.statusCode, output);
		});
	});

	req.on('error', function(err) {
		//res.send('error: ' + err.message);
	});
	
	req.end();

});

module.exports = router;