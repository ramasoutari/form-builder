import Link from "next/link";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import DescriptionIcon from "@mui/icons-material/Description";
import "./styles/home.scss";

export default function Home() {
  return (
    <div className="home-root">
      <div className="home-container">
        <div className="home-content">
          <div className="home-badge">
            <PhotoFilterIcon className="w-4 h-4" />
            <span>Professional Form Builder</span>
          </div>

          <h1 className="home-title">
            Build Beautiful Forms
            <br />
            <span className="home-title-highlight">With Drag & Drop</span>
          </h1>

          <p className="home-description">
            Create professional forms effortlessly with our intuitive
            drag-and-drop interface.
          </p>

          <div className="home-actions">
            <Link href="/form-builder">
              <button className="gap-2 text-lg px-8 py-6">
                <DescriptionIcon className="w-5 h-5" />
                Start Building
              </button>
            </Link>
          </div>

          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon bg-blue-100 dark:bg-blue-900">
                <DescriptionIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="feature-title">Drag & Drop</h3>
              <p className="feature-text">Intuitive interface to build forms</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon bg-blue-100 dark:bg-blue-900">
                <PhotoFilterIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="feature-title">Fully Customizable</h3>
              <p className="feature-text">
                {" "}
                Customize every aspect of your fields with comprehensive
                property controls
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon bg-blue-100 dark:bg-blue-900">
                <DescriptionIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h3 className="feature-title">Production Ready</h3>
              <p className="feature-text">
                {" "}
                Built with modern technologies and best practices for real-world
                applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
