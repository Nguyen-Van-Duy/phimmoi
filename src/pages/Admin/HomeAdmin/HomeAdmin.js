import React from "react";
// import Chart from "./Chart";
import "./HomeAdmin.css";

export default function HomeAdmin() {
  return (
    <>
      <div className="admin-row">
        <div className="admin-col">
          <a href="/admin/account-admin">
            <div className="admin-item">
              <div className="admin-children">
                <svg
                  className="admin-icon"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="AdminPanelSettingsIcon"
                >
                  <path d="M17 11c.34 0 .67.04 1 .09V6.27L10.5 3 3 6.27v4.91c0 4.54 3.2 8.79 7.5 9.82.55-.13 1.08-.32 1.6-.55-.69-.98-1.1-2.17-1.1-3.45 0-3.31 2.69-6 6-6z"></path>
                  <path d="M17 13c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 1.38c.62 0 1.12.51 1.12 1.12s-.51 1.12-1.12 1.12-1.12-.51-1.12-1.12.5-1.12 1.12-1.12zm0 5.37c-.93 0-1.74-.46-2.24-1.17.05-.72 1.51-1.08 2.24-1.08s2.19.36 2.24 1.08c-.5.71-1.31 1.17-2.24 1.17z"></path>
                </svg>
              </div>
              <p className="">Admin</p>
              <p className="">5</p>
            </div>
          </a>
        </div>
        <div className="admin-col">
          <a href="/admin/account-admin">
            <div className="admin-item">
              <div
                className="admin-children"
                style={{ backgroundColor: "rgb(65, 155, 240)" }}
              >
                <svg
                  className="admin-icon"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="PersonIcon"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                </svg>
              </div>
              <p className="">User</p>
              <p className="">5</p>
            </div>
          </a>
        </div>
        <div className="admin-col">
          <a href="/admin/account-admin">
            <div className="admin-item">
              <div className="admin-children" style={{ backgroundColor: "rgb(90, 178, 94)" }}>
                <svg
                  className="admin-icon"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="MovieCreationIcon"
                  title="MovieCreation"
                >
                  <path d="m18 4 2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"></path>
                </svg>
              </div>
              <p className="">Movie</p>
              <p className="">5</p>
            </div>
          </a>
        </div>
        
      </div>
      {/* <div><Chart /></div> */}
    </>
  );
}
