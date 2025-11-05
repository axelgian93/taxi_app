//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:taxi_openapi/src/model/payments_refunds_by_trip200_response_items_inner.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'admin_refunds_list200_response.g.dart';

/// AdminRefundsList200Response
///
/// Properties:
/// * [items] 
/// * [nextCursor] 
@BuiltValue()
abstract class AdminRefundsList200Response implements Built<AdminRefundsList200Response, AdminRefundsList200ResponseBuilder> {
  @BuiltValueField(wireName: r'items')
  BuiltList<PaymentsRefundsByTrip200ResponseItemsInner>? get items;

  @BuiltValueField(wireName: r'nextCursor')
  String? get nextCursor;

  AdminRefundsList200Response._();

  factory AdminRefundsList200Response([void updates(AdminRefundsList200ResponseBuilder b)]) = _$AdminRefundsList200Response;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AdminRefundsList200ResponseBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AdminRefundsList200Response> get serializer => _$AdminRefundsList200ResponseSerializer();
}

class _$AdminRefundsList200ResponseSerializer implements PrimitiveSerializer<AdminRefundsList200Response> {
  @override
  final Iterable<Type> types = const [AdminRefundsList200Response, _$AdminRefundsList200Response];

  @override
  final String wireName = r'AdminRefundsList200Response';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AdminRefundsList200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.items != null) {
      yield r'items';
      yield serializers.serialize(
        object.items,
        specifiedType: const FullType(BuiltList, [FullType(PaymentsRefundsByTrip200ResponseItemsInner)]),
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
    AdminRefundsList200Response object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object, specifiedType: specifiedType).toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required AdminRefundsList200ResponseBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'items':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(PaymentsRefundsByTrip200ResponseItemsInner)]),
          ) as BuiltList<PaymentsRefundsByTrip200ResponseItemsInner>;
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
  AdminRefundsList200Response deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AdminRefundsList200ResponseBuilder();
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

