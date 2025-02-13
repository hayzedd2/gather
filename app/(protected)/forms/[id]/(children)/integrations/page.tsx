
import React from "react";

const page = () => {
  return (
    <div className="px-3">
      <div className="heading my-4 flex flex-col">
        <h4 className="font-[500] text-[1.4rem]">Integrations </h4>
        <h6 className="text-regular mt-[-2px] font-[500] text-[14px]">
          Manage Integrations for this form
        </h6>
      </div>
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-y-3">
        <div className="p-5 border rounded-lg">
          <div className="flex justify-between items-center ">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="35"
                height="35"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#43a047"
                  d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"
                ></path>
                <path fill="#c8e6c9" d="M40 13L30 13 30 3z"></path>
                <path fill="#2e7d32" d="M30 13L40 23 40 13z"></path>
                <path
                  fill="#e8f5e9"
                  d="M31,23H17h-2v2v2v2v2v2v2v2h18v-2v-2v-2v-2v-2v-2v-2H31z M17,25h4v2h-4V25z M17,29h4v2h-4V29z M17,33h4v2h-4V33z M31,35h-8v-2h8V35z M31,31h-8v-2h8V31z M31,27h-8v-2h8V27z"
                ></path>
              </svg>
            </div>
          </div>
          <div className="about mt-3">
            <h3 className="font-[600] text-[19px]">Google sheets</h3>
            <h6 className="text-[13px]">
              Integrate with google sheets to get your form responses sent to a
              sheets table
            </h6>
          </div>
          <div className="connect w-full flex mt-2 justify-end">
            <span
              className={`whitespace-nowrap   w-max  text-xs font-[500] py-1 bg-gray-50 text-gray-600 ring-1 ring-inset cursor-pointer  ring-gray-500/10 rounded-full px-2`}
            >
              Coming soon
            </span>
          </div>
        </div>
        <div className="p-5 border rounded-lg">
          <div className="flex justify-between items-center ">
            <div className="logo">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                preserveAspectRatio="xMidYMid"
                viewBox="0 0 256 268"
              >
                <path
                  fill="#FFF"
                  d="M16.092 11.538 164.09.608c18.179-1.56 22.85-.508 34.28 7.801l47.243 33.282C253.406 47.414 256 48.975 256 55.207v182.527c0 11.439-4.155 18.205-18.696 19.24L65.44 267.378c-10.913.517-16.11-1.043-21.825-8.327L8.826 213.814C2.586 205.487 0 199.254 0 191.97V29.726c0-9.352 4.155-17.153 16.092-18.188Z"
                />
                <path d="M164.09.608 16.092 11.538C4.155 12.573 0 20.374 0 29.726v162.245c0 7.284 2.585 13.516 8.826 21.843l34.789 45.237c5.715 7.284 10.912 8.844 21.825 8.327l171.864-10.404c14.532-1.035 18.696-7.801 18.696-19.24V55.207c0-5.911-2.336-7.614-9.21-12.66l-1.185-.856L198.37 8.409C186.94.1 182.27-.952 164.09.608ZM69.327 52.22c-14.033.945-17.216 1.159-25.186-5.323L23.876 30.778c-2.06-2.086-1.026-4.69 4.163-5.207l142.274-10.395c11.947-1.043 18.17 3.12 22.842 6.758l24.401 17.68c1.043.525 3.638 3.637.517 3.637L71.146 52.095l-1.819.125Zm-16.36 183.954V81.222c0-6.767 2.077-9.887 8.3-10.413L230.02 60.93c5.724-.517 8.31 3.12 8.31 9.879v153.917c0 6.767-1.044 12.49-10.387 13.008l-161.487 9.361c-9.343.517-13.489-2.594-13.489-10.921ZM212.377 89.53c1.034 4.681 0 9.362-4.681 9.897l-7.783 1.542v114.404c-6.758 3.637-12.981 5.715-18.18 5.715-8.308 0-10.386-2.604-16.609-10.396l-50.898-80.079v77.476l16.1 3.646s0 9.362-12.989 9.362l-35.814 2.077c-1.043-2.086 0-7.284 3.63-8.318l9.351-2.595V109.823l-12.98-1.052c-1.044-4.68 1.55-11.439 8.826-11.965l38.426-2.585 52.958 81.113v-71.76l-13.498-1.552c-1.043-5.733 3.111-9.896 8.3-10.404l35.84-2.087Z" />
              </svg>
            </div>
          </div>
          <div className="about mt-3">
            <h3 className="font-[600] text-[19px]">Notion</h3>
            <h6 className="text-[13px]">
              Integrate with notion to get your form responses directly sent to
              a notion table
            </h6>
          </div>
          <div className="connect w-full flex mt-2 justify-end">
            <span
              className={`whitespace-nowrap   w-max  text-xs font-[500] py-1 bg-gray-50 text-gray-600 ring-1 ring-inset   ring-gray-500/10 rounded-full px-2`}
            >
              Coming soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
