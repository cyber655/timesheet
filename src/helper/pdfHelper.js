import jsPDF from "jspdf";
import "jspdf-autotable";
import _ from "lodash";
import moment from "moment";

class PDFHelper {
  constructor(
    pdfSettings,
    overallHours = 0,
    timesheetDate = moment().toDate()
  ) {
    this.doc = new jsPDF();
    this.siteLeftRightTopPadding = 14.1111111111111;
    this.siteBottomPadding = 30;
    this.currentYPosition = this.siteLeftRightTopPadding;
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.overallHours = overallHours;
    this.doc.setFontSize(12);
    this.timesheetDate = moment(timesheetDate);
    this.pdfSettings = pdfSettings;
  }

  createPDF() {
    this.writeMetaDataHeaderToPDF();
    this.createTimeEntriesAutoTable();
    this.writeSignatureAndTotalHoursToPDF();
    this.writePageNumberToPDF();
    this.savePDF();
  }

  writeMetaDataHeaderToPDF() {
    let lastYTextPosition = [];

    let customerLinesToWrite = this.pdfSettings.customerData.split("\n");
    lastYTextPosition.push(
      this.writeLines(customerLinesToWrite, false, 12, 30.0)
    );

    let timeSheetGeneralInformation = [];
    timeSheetGeneralInformation.push(
      `Handy: ${this.pdfSettings.ownData.handyNumber}`
    );
    timeSheetGeneralInformation.push(
      `E-Mail: ${this.pdfSettings.ownData.email}`
    );
    timeSheetGeneralInformation.push(
      `Webpage: ${this.pdfSettings.ownData.webpage}`
    );

    let rightSideFirstInformationYStartPosition =
      10 + this.writeLines(timeSheetGeneralInformation, true, 9, 17);

    let timesheetInformationArray = [];
    timesheetInformationArray.push(
      `Creation date: ${moment().format("DD/MM/YYYY")}`
    );
    timesheetInformationArray.push(
      `Month/Year: ${this.timesheetDate.format("MM/YYYY")}`
    );
    timesheetInformationArray.push(`Name: ${this.pdfSettings.ownData.name}`);

    lastYTextPosition.push(
      this.writeLines(
        timesheetInformationArray,
        true,
        9,
        rightSideFirstInformationYStartPosition
      )
    );

    if (lastYTextPosition.length >= 0) {
      this.currentYPosition = Math.max.apply(Math, lastYTextPosition) + 10;
    }
  }

  writePageNumberToPDF() {
    //Write page number to PDF
    let doc = this.doc;
    doc.setFontSize(9);
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      this.doc.setPage(i);
      let pageNumberText = `Page: ${i}`;
      let pageNumberTextCenteredXStartPosition =
        this.pageWidth / 2 - doc.getTextWidth(pageNumberText) / 2;
      doc.text(
        pageNumberText,
        pageNumberTextCenteredXStartPosition,
        this.pageHeight - this.siteLeftRightTopPadding
      );
    }
  }

  writeSignatureAndTotalHoursToPDF() {
    //Texts to write to PDF
    let overallHoursString = `Total hours: ${this.overallHours.toString()}`;
    let signatureUnderscore = "_________________________";
    let freelancerSignature = "Date, Freelancer";
    let customerSignature = "Date, Customer";

    //Padding
    let overallHoursPadding = 8;
    let paddingAfterUnderscore = 3;

    //Text width and height pre definitions
    let overallHoursHeight = this.doc.getTextDimensions(overallHoursString).h;
    let overallHoursWidth = this.doc.getTextDimensions(overallHoursString).w;
    let hightFreelanceSignature = this.doc.getTextDimensions(
      freelancerSignature
    ).h;
    let heightCustomerSignature = this.doc.getTextDimensions(customerSignature)
      .h;
    let heightSignatureUnderscore = this.doc.getTextDimensions(
      signatureUnderscore
    ).h;
    let signatureUnderscoreWidth = this.doc.getTextWidth(signatureUnderscore);

    //Some needed variables
    this.currentYPosition = this.doc.autoTable.previous.finalY + 18;

    let heightTotalHoursWithSignature = 0;

    if (hightFreelanceSignature > heightCustomerSignature) {
      heightTotalHoursWithSignature += hightFreelanceSignature;
    } else {
      heightTotalHoursWithSignature += heightCustomerSignature;
    }

    heightTotalHoursWithSignature +=
      overallHoursHeight +
      overallHoursPadding +
      paddingAfterUnderscore +
      heightSignatureUnderscore;

    if (
      this.pageHeight - this.siteBottomPadding <
      this.currentYPosition + heightTotalHoursWithSignature
    ) {
      this.doc.addPage();
      this.currentYPosition = this.siteLeftRightTopPadding;
    }

    //Write overall hours to PDF
    this.doc.setFontType("bold");
    this.doc.text(
      overallHoursString,
      this.pageWidth - this.siteLeftRightTopPadding - overallHoursWidth - 3,
      this.currentYPosition
    );
    this.doc.setFontType("normal");

    let startPositionAfterOverallHours =
      this.currentYPosition + overallHoursHeight + overallHoursPadding;

    //Write underscore on left side to PDF
    this.doc.text(
      signatureUnderscore,
      this.siteLeftRightTopPadding,
      startPositionAfterOverallHours
    );

    //Write underscore on right side to PDF
    this.doc.text(
      signatureUnderscore,
      this.pageWidth - this.siteLeftRightTopPadding - signatureUnderscoreWidth,
      startPositionAfterOverallHours
    );

    let startPositionAfterSignatureUnderscore =
      startPositionAfterOverallHours +
      heightSignatureUnderscore +
      paddingAfterUnderscore;

    //Write 'freelancer' signature on left side to PDF
    let freelanceSignatureCentered = this.getCenteredSignatureTextValue(
      signatureUnderscoreWidth,
      freelancerSignature
    );

    this.doc.text(
      freelancerSignature,
      this.siteLeftRightTopPadding + freelanceSignatureCentered,
      startPositionAfterSignatureUnderscore
    );

    let customerSignatureCentered =
      this.pageWidth -
      this.siteLeftRightTopPadding -
      signatureUnderscoreWidth +
      this.getCenteredSignatureTextValue(
        signatureUnderscoreWidth,
        customerSignature
      );

    this.doc.text(
      customerSignature,
      customerSignatureCentered,
      startPositionAfterSignatureUnderscore
    );
  }

  getCenteredSignatureTextValue(signatureUnderscoreWidth, signature) {
    return signatureUnderscoreWidth / 2 - this.doc.getTextWidth(signature) / 2;
  }

  writeLines(
    linesToWrite,
    writeRight = false,
    fontSize = 11,
    startPoint_Y = null
  ) {
    let paddingTextAddress = 3;
    let doc = this.doc;
    let previousFontSize = doc.getFontSize();

    /**
    let writingStartPoint_X;

    if (writeRight) {
      writingStartPoint_X =
        this.pageWidth -
        this.siteLeftRightTopPadding -
        this.findLongestLengthInLines(linesToWrite);
    } else {
      writingStartPoint_X = this.siteLeftRightTopPadding;
    }
     */

    let lastYPosition = startPoint_Y ? startPoint_Y : this.currentYPosition;

    doc.setFontSize(fontSize);
    _.forEach(linesToWrite, element => {
      let writingStartPoint_X;
      if (writeRight) {
        writingStartPoint_X =
          this.pageWidth -
          this.siteLeftRightTopPadding -
          this.doc.getTextDimensions(element).w;
      } else {
        writingStartPoint_X = this.siteLeftRightTopPadding;
      }

      doc.text(element, writingStartPoint_X, lastYPosition);
      lastYPosition += doc.getTextDimensions(element).h + paddingTextAddress;
    });

    doc.setFontSize(previousFontSize);

    return lastYPosition;
  }

  findLongestLengthInLines(linesToWrite) {
    let longestLength = 0;
    _.forEach(linesToWrite, element => {
      let textWidth = this.doc.getTextDimensions(element).w;
      if (textWidth > longestLength) {
        longestLength = textWidth;
      }
    });
    return longestLength;
  }

  createTimeEntriesAutoTable() {
    this.doc.autoTable({
      html: "#time-entry-table",
      headStyles: {
        halign: "center",
        lineWidth: 0.09,
        lineColor: 10
      },
      columnStyles: {
        0: {
          columnWidth: 50,
          lineWidth: 0.09,
          lineColor: 9,
          halign: "center"
        },
        1: {
          columnWidth: 30,
          lineWidth: 0.09,
          lineColor: 9,
          halign: "center"
        },
        2: {
          columnWidth: 80,
          lineWidth: 0.09,
          lineColor: 9,
          halign: "center"
        },
        3: {
          columnWidth: 20,
          lineWidth: 0.09,
          lineColor: 9,
          halign: "center"
        }
      },
      margin: {
        bottom: this.siteBottomPadding
      },
      startY: this.currentYPosition
    });
    this.currentYPosition = this.doc.autoTable.previous.finalY + 18;
  }

  savePDF() {
    this.doc.save("table.pdf");
  }
}

export { PDFHelper };
