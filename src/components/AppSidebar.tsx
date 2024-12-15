import {
  Folder,
  Library,
  Star,
  Code2,
  Video,
  FileText,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FolderItemProps {
  label: string;
  icon: React.ReactNode;
  isExpanded?: boolean;
  children?: React.ReactNode;
}

const FolderItem = ({ label, icon, isExpanded = false, children }: FolderItemProps) => {
  const [expanded, setExpanded] = useState(isExpanded);

  return (
    <div>
      <div 
        className="flex items-center gap-1 px-2 py-1 hover:bg-gray-800/50 cursor-pointer text-sm"
        onClick={() => setExpanded(!expanded)}
      >
        {children ? (
          expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        ) : (
          <span className="w-4" />
        )}
        {icon}
        <span>{label}</span>
      </div>
      {expanded && children && (
        <div className="ml-4">
          {children}
        </div>
      )}
    </div>
  );
};

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-gray-800 bg-[#1E1E1E] text-gray-300">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 px-2">
            Explorer
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <FolderItem 
                label="My Favorites" 
                icon={<Star className="w-4 h-4 text-gray-400" />} 
              />
              <FolderItem 
                label="My Folder" 
                icon={<Folder className="w-4 h-4 text-gray-400" />}
                isExpanded={true}
              >
                <FolderItem 
                  label="data" 
                  icon={<Folder className="w-4 h-4 text-gray-400" />}
                >
                  <div className="flex items-center gap-1 px-2 py-1 hover:bg-gray-800/50 cursor-pointer text-sm">
                    <span className="w-4" />
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span>git-functions.sas</span>
                  </div>
                </FolderItem>
                <FolderItem 
                  label="My Snippets" 
                  icon={<Code2 className="w-4 h-4 text-gray-400" />} 
                />
                <FolderItem 
                  label="My Tasks" 
                  icon={<FileText className="w-4 h-4 text-gray-400" />} 
                />
                <FolderItem 
                  label="SAS Videos" 
                  icon={<Video className="w-4 h-4 text-gray-400" />} 
                />
                <FolderItem 
                  label="sas-dummy-blog" 
                  icon={<FileText className="w-4 h-4 text-gray-400" />} 
                />
              </FolderItem>
              <FolderItem 
                label="SAS Content" 
                icon={<FileText className="w-4 h-4 text-gray-400" />} 
              />
              <FolderItem 
                label="Recycle Bin" 
                icon={<Trash2 className="w-4 h-4 text-gray-400" />} 
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-gray-500 px-2 mt-4">
            Libraries
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                "CASUSER",
                "CPGRETL",
                "EDUPUB",
                "EP_DOE",
                "EP_K12",
                "EP_SAFE",
                "FORMATS",
                "GPCI",
                "GTPPUB",
                "IMAGES"
              ].map((lib) => (
                <FolderItem 
                  key={lib}
                  label={lib} 
                  icon={<Library className="w-4 h-4 text-gray-400" />} 
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}