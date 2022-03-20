import { jsPDF } from "jspdf";

export const generatePDF = (obj) => {
    var doc = new jsPDF();

    var transcriptData = obj.data;

    doc.setFont("times", "normal");
    doc.text("Faculty of ... .", 100, 15, null, null);
    doc.setFontSize(14);
    doc.text(`Name: ${obj.studentName}`, 25, 25, null, null);
    doc.text("Date of Birth: April,0,1999", 25, 30, null, null);
    doc.text("Student ID: 1212312121", 100, 30, null, null);
    doc.text("Date of Admission: 2017", 25, 35, null, null);
    doc.text("Date of Graduation: 2020", 100, 35, null, null);
    doc.text("Degree: Bachelor Of Engineering", 25, 40, null, null);
    doc.text("Major: Computer Engineering", 25, 45, null, null);

    let startXS1 = 25;
    let startYS1 = 55;
    const smallLineHeight = 4;
    for (var i = 0; i < transcriptData.length; i++) {
        if (startYS1 >= 230) {
            startXS1 = 110;
            startYS1 = 55;
        }

        doc.setFontSize(14);
        doc.text(
            `${transcriptData[i].term} Semester, Years, ${transcriptData[i].year}`,
            startXS1,
            startYS1,
            null,
            null
        );

        doc.setFontSize(12);
        startYS1 += smallLineHeight;
        var startSmallY = startYS1;
        transcriptData[i].grade.map((v) => {
            var startSmallX = startXS1;
            startSmallY += smallLineHeight;
            doc.text(`${v.subjectID}`, startSmallX, startSmallY);
            startSmallX += 20;
            doc.text(`${v.subjectName}`, startSmallX, startSmallY);
            startSmallX += 35;
            doc.text(`${v.credit}`, startSmallX, startSmallY);
            startSmallX += 5;
            doc.text(`${v.grade}`, startSmallX, startSmallY);
        });
        startYS1 = startSmallY + 10;
    }

    doc.setProperties({
        title: `${obj.id}`,
        author: `${obj.issuerName}:${obj.issuerPublicKey}`,
        subject: `${obj.studentName}:${obj.studentID}`,
    });


    return doc.output('blob');
};
