using System;

namespace DraggableShapeEx
{
    public class Shape
    {
        public string Name { get; set; }
        public int Width { get; set; }

        public int Height { get; set; }

        public int? BorderRadius { get; set; }

        public int? BorderLeft { get; set; }
        
        public int? BorderRight { get; set; }
        
        public int? BorderBottom { get; set; }
    }
}