import { Injectable } from "@angular/core";

import { Timestamp } from "@angular/fire/firestore";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
} from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor(private formBuilder: FormBuilder) {}

  createFormGroup(obj: any) {
    let formGroup: { [id: string]: AbstractControl } = {};

    Object.keys(obj).forEach((key) => {
      formGroup[key] =
        obj[key] instanceof Object
          ? obj[key] instanceof Array
            ? this.createFormArray(obj[key])
            : this.createFormGroup(obj[key])
          : new FormControl(obj[key]);
    });

    return this.formBuilder.group(formGroup);
  }

  createFormArray(obj: any) {
    let formArray: FormArray = this.formBuilder.array([]);

    Object.keys(obj).forEach((key) => {
      formArray.push(
        obj[key] instanceof Object
          ? this.createFormGroup(obj[key])
          : new FormControl(obj[key])
      );
    });

    return formArray;
  }

  convertDatesToTimestamp(object: any) {
    for (const key in object) {
      // console.log(`${key}: ${object[key as keyof object]}`);

      if (
        Object.prototype.toString.call(object[key as keyof object]) ===
        "[object Date]"
      ) {
        object[key as keyof object] = Timestamp.fromDate(
          object[key as keyof object]
        );
      } else if (typeof object[key as keyof object] === "object") {
        object[key as keyof object] = this.convertDatesToTimestamp(
          object[key as keyof object]
        );
      }
    }

    return object;
  }

  convertDatesToDateString(object: any) {
    for (const key in object) {
      // console.log(`${key}: ${object[key as keyof object]}`);

      if (
        typeof object[key as keyof object] === "object" &&
        object[key as keyof object] &&
        "nanoseconds" in object[key as keyof object]
      ) {
        // console.log('Found timestamp!');
        object[key as keyof object] = new Timestamp(
          object[key as keyof object].seconds,
          object[key as keyof object].nanoseconds
        ).toDate();
      } else if (typeof object[key as keyof object] === "object") {
        object[key as keyof object] = this.convertDatesToTimestamp(
          object[key as keyof object]
        );
      }
    }

    return object;
  }

  convertStringsToBoolean(object: any) {
    for (const key in object) {
      // console.log(`${key}: ${object[key as keyof object]}`);

      if (typeof object[key as keyof object] === "string") {
        if (object[key as keyof object] === "true") {
          object[key as keyof object] = true;
        } else if (object[key as keyof object] === "false") {
          object[key as keyof object] = false;
        }
      } else if (typeof object[key as keyof object] === "object") {
        object[key as keyof object] = this.convertStringsToBoolean(
          object[key as keyof object]
        );
      }
    }

    return object;
  }

  convertTimeToDate(
    originalDate: Date,
    time: { hour: number; minute: number }
  ) {
    let newDate = new Date(
      originalDate.getFullYear(),
      originalDate.getMonth(),
      originalDate.getDate(),
      time.hour,
      time.minute
    );
    return newDate;
  }

  EnumToObjectArray(enumInput: any, sort: boolean = false) {
    const array = Object.keys(enumInput).map((value) => {
      return {
        value,
        name: enumInput[value as keyof typeof enumInput],
      };
    });

    if (sort) {
      return array.sort((a, b) => a.name.localeCompare(b.name));
    }

    return array;
  }

  enumNameToValue(name: any, enumInput: any) {
    let enumArray = this.EnumToObjectArray(enumInput);

    let objMatch = enumArray.find((obj) => {
      if (obj.name == name) return true;
      return false;
    });
    console.log(
      "file: helper.service.ts:127 -> HelperService -> objMatch -> objMatch:",
      objMatch
    );

    return objMatch?.value;
  }

  timestampIsZero(timestamp: Timestamp | undefined): boolean {
    if (timestamp?.nanoseconds == 0 && timestamp?.seconds == 0) {
      return true;
    }
    if (timestamp == undefined) return true;
    return false;
  }

  async convertToWebP(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvasSize = 500; // Size of the canvas (500px square)
          const canvas = document.createElement("canvas");
          canvas.width = canvasSize;
          canvas.height = canvasSize;
          const ctx = canvas.getContext("2d");

          // Calculate the scaling factor to maintain aspect ratio
          const scale = Math.min(
            canvasSize / img.width,
            canvasSize / img.height
          );

          // Calculate the x and y coordinates to center the image
          const x = (canvasSize - img.width * scale) / 2;
          const y = (canvasSize - img.height * scale) / 2;

          // Clear the canvas and draw the image at the center
          ctx?.clearRect(0, 0, canvasSize, canvasSize);
          ctx?.drawImage(img, x, y, img.width * scale, img.height * scale);

          canvas.toBlob(
            (blob) => {
              resolve(blob ?? new Blob());
            },
            "image/webp",
            0.5
          ); // Adjust the quality as needed
        };
        img.src = event.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  cleanObject(obj: any): Object {
    return JSON.parse(JSON.stringify(obj));
  }
}
