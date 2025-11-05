//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:taxi_openapi/src/model/rider_my_trips200_response_items_inner.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'rider_my_trips200_response.g.dart';

/// RiderMyTrips200Response
///
/// Properties:
/// * [items] 
/// * [nextCursor] 
@BuiltValue()
abstract class RiderMyTrips200Response implements Built<RiderMyTrips200Response, RiderMyTrips200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<RiderMyTrips200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'nextCursor')
  String? get nextCursor;

  RiderMyTrips200Response._();

  factory RiderMyTrips200Response([void updates(RiderMyTrips200ResponseBuilder b)]) = _$RiderMyTrips200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RiderMyTrips200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RiderMyTrips200Response> get serializer => _$RiderMyTrips200ResponseSerializer();
}

class _$RiderMyTrips200ResponseSerializer implements PrimitiveSerializer<RiderMyTrips200Response> {
  @override
  final Iterable<Type> types = const [RiderMyTrips200Response, _$RiderMyTrips200Response];

  @override
  final String wireName = r'RiderMyTrips200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RiderMyTrips200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(RiderMyTrips200ResponseItemsInner)]),
      );
    }
    if (object.nextCursor != null) {
      yield r'nextCursor';
      yield serializers.serialize(
        object.nextCursor,
        specifiedType: const FullType.nullable(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    RiderMyTrips200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required RiderMyTrips200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(RiderMyTrips200ResponseItemsInner)]),
          ) as BuiltList<RiderMyTrips200ResponseItemsInner>;
          result.items.replace(valueDes);
          break;
        case r'nextCursor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.nextCursor = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  RiderMyTrips200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RiderMyTrips200ResponseBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

