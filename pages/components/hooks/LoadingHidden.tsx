import * as Swal from "sweetalert2";

// @ts-ignore
const LoadingHidden = async (timeWaitting,open,close) => {
    return new Promise((resolve) => {
        // @ts-ignore
        Swal.fire({
            html: `
        <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
          <div class="loader"></div>
        </div>
      `,
            timer: {timeWaitting}?(timeWaitting):4000,
            title: "Vui lòng đợi chúng tôi xử lí trong vòng vài giây",
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: (open:any) => {
                // @ts-ignore
                resolve(Swal.getTimerProgressBar());
            },
            willClose: (close:any) => {
                // @ts-ignore
                resolve(Swal.getTimerProgressBar());
            },
        });
    });
};

export default LoadingHidden;